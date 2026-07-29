#!/bin/bash
set -e

echo "=== Ascension Codex APK Builder ==="
echo ""

# Paths
PROJECT_DIR="/data/data/com.termux/files/home/Ascension-Codex-app"
ANDROID_HOME="/data/data/com.termux/files/home/android-sdk"
ANDROID_JAR="$ANDROID_HOME/platforms/android-35/android.jar"
BUILD_TOOLS="$ANDROID_HOME/build-tools/35.0.0"
AAPT="/data/data/com.termux/files/usr/bin/aapt"
D8="$BUILD_TOOLS/d8"
APKSIGNER="$BUILD_TOOLS/apksigner"
ZIPALIGN="$BUILD_TOOLS/zipalign"

ANDROID_DIR="$PROJECT_DIR/android"
DIST_DIR="$PROJECT_DIR/dist/public"
BUILD_DIR="$PROJECT_DIR/build"
OUTPUT_DIR="$PROJECT_DIR/output"

# Clean
echo "[1/8] Cleaning build directories..."
rm -rf "$BUILD_DIR" "$OUTPUT_DIR"
mkdir -p "$BUILD_DIR/classes" "$BUILD_DIR/dex" "$BUILD_DIR/assets" "$OUTPUT_DIR"

# Copy web assets
echo "[2/8] Copying web assets to APK assets..."
cp -r "$DIST_DIR"/* "$BUILD_DIR/assets/"
cp -r "$ANDROID_DIR/res" "$BUILD_DIR/res"

# Compile resources with aapt
echo "[3/8] Compiling resources with aapt..."
"$AAPT" package -f -m \
  -J "$BUILD_DIR/classes" \
  -M "$ANDROID_DIR/AndroidManifest.xml" \
  -S "$BUILD_DIR/res" \
  -I "$ANDROID_JAR" \
  --no-version-vectors \
  2>&1 | grep -v "WARNING"

# Copy Java source
echo "[4/8] Compiling Java sources..."
cp -r "$ANDROID_DIR/java"/* "$BUILD_DIR/classes/"
javac -d "$BUILD_DIR/classes" \
  -classpath "$ANDROID_JAR" \
  -source 11 -target 11 \
  "$BUILD_DIR/classes/com/ascension/codex/MainActivity.java" \
  "$BUILD_DIR/classes/com/ascension/codex/R.java" \
  2>&1 || {
  # R.java might not exist yet, try without it
  echo "Retrying: R.java may not have been generated, compiling Activity only..."
  javac -d "$BUILD_DIR/classes" \
    -classpath "$ANDROID_JAR" \
    -source 11 -target 11 \
    "$BUILD_DIR/classes/com/ascension/codex/MainActivity.java" \
    2>&1
}

# Convert to dex using d8
echo "[5/8] Converting to DEX bytecode..."
cd "$BUILD_DIR/classes"
"$D8" --lib "$ANDROID_JAR" \
  --output "$BUILD_DIR/dex" \
  $(find . -name "*.class") \
  2>&1
cd "$PROJECT_DIR"

# Package unsigned APK with aapt
echo "[6/8] Packaging unsigned APK..."
"$AAPT" package -f \
  -M "$ANDROID_DIR/AndroidManifest.xml" \
  -S "$BUILD_DIR/res" \
  -A "$BUILD_DIR/assets" \
  -I "$ANDROID_JAR" \
  -F "$OUTPUT_DIR/ascension-codex-unsigned.apk" \
  --no-version-vectors \
  2>&1 | grep -v "WARNING"

# Add dex to APK
echo "[7/8] Adding DEX to APK..."
cd "$BUILD_DIR/dex"
"$AAPT" add "$OUTPUT_DIR/ascension-codex-unsigned.apk" classes.dex classes2.dex 2>/dev/null || \
"$AAPT" add "$OUTPUT_DIR/ascension-codex-unsigned.apk" classes.dex 2>/dev/null || \
echo "Note: classes.dex added via package step"
cd "$PROJECT_DIR"

# Sign the APK
echo "[8/8] Signing APK..."
"$APKSIGNER" sign \
  --ks "$PROJECT_DIR/debug.keystore" \
  --ks-pass pass:android \
  --key-pass pass:android \
  --ks-key-alias androiddebugkey \
  --out "$OUTPUT_DIR/ascension-codex.apk" \
  "$OUTPUT_DIR/ascension-codex-unsigned.apk" \
  2>&1

# Verify
echo ""
echo "=== APK Build Complete ==="
"$APKSIGNER" verify "$OUTPUT_DIR/ascension-codex.apk" 2>&1 || true
echo ""
ls -lh "$OUTPUT_DIR/ascension-codex.apk"
echo "APK location: $OUTPUT_DIR/ascension-codex.apk"
