#!/bin/bash
set -e

SRC="app/images"
DEST="images-renamed"

mkdir -p "$DEST"

cd "$SRC"

# Use a Python helper to handle weird filenames cleanly
python3 << 'PYTHON_END'
import os
import shutil

src = "."
dest = "../../images-renamed"

# Get all PNG files
files = sorted([f for f in os.listdir(src) if f.endswith('.png')])
print(f"Found {len(files)} PNG files")

# Mapping based on content keywords in filename
mapping = {
    "add coke branding": "hero-coca-cola-sunset-station.png",
    "five glass-front beverage cooler": "cooler-doors-promotional-graphics.png",
    "feather flag staked": "feather-flag-circle-k-hot-food.png",
    "single-tower open-air": "grab-go-fresh-eats-cooler.png",
    "two-tier open-air grab-and-go": "snack-fresh-eat-well-cooler.png",
    "black-framed storefront with cut white vinyl": "storefront-vinyl-lettering.png",
    "two square printed menu signs floating": "hot-dog-combo-menu-signs.png",
    "freestanding outdoor poster sign frame": "karma-wellness-poster-frame.png",
    "white and green gas pump dispenser": "gas-pump-celsius-topper.png",
    "stainless-steel-trim countertop iced coffee": "iced-coffee-dispenser.png",
    "tall cylindrical double-sided point-of-purchase": "vuex-pop-floor-display.png",
    "three-panel modular QSR menu board": "qsr-hangry-burger-menu-board.png",
    "two-tier freestanding pylon identification": "hanks-bbq-pylon-sign.png",
    "vertical rectangular printed pole-mounted": "fiji-stay-hydrated-pole-sign.png",
    "white aluminum A-frame sandwich board": "brunch-a-frame-sandwich-board.png",
    "wide horizontal suspended menu board": "suspended-menu-board.png",
    "three different promotional flag formats": "three-flag-formats-showroom.png",
    "two horizontal pink rectangular shelf talker": "coke-pepsi-shelf-talkers.png",
    "Main Prompt": "storefront-promo-window-cling.png",
    "Re-do this.  884159 (1)": "storefront-coffee-fresh-food-aframe.png",
    "Re-do this.  884159 (2)": "newport-marlboro-pylon-toppers.png",
    "Re-do this.  884159.png": "marlboro-gas-pump-promo.png",
    "This needs to be abov": "corona-find-your-beach-beer-cave.png",
}

renamed_count = 0
for f in files:
    matched = False
    for keyword, new_name in mapping.items():
        if keyword in f:
            src_path = os.path.join(src, f)
            dest_path = os.path.join(dest, new_name)
            shutil.copy2(src_path, dest_path)
            print(f"✓ {f[:50]}... → {new_name}")
            renamed_count += 1
            matched = True
            break
    if not matched:
        print(f"✗ NO MATCH: {f}")

print(f"\nRenamed {renamed_count} of {len(files)} files")
PYTHON_END

echo ""
echo "Done. Files in $DEST:"
ls -la "../$DEST/" 2>/dev/null || ls -la "$DEST/"
