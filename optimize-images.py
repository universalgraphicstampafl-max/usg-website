#!/usr/bin/env python3
import subprocess
import os
import shutil

src = "images-renamed"

mapping = {
    "hero-coca-cola-sunset-station.png": "images/hero/hero-primary.webp",
    "storefront-promo-window-cling.png": "images/services/signage-programs.webp",
    "qsr-hangry-burger-menu-board.png": "images/services/graphic-design.webp",
    "cooler-doors-promotional-graphics.png": "images/services/custom-print-production.webp",
    "gas-pump-celsius-topper.png": "images/services/store-surveys.webp",
    "feather-flag-circle-k-hot-food.png": "images/services/direct-store-delivery.webp",
    "iced-coffee-dispenser.png": "images/services/product-photography.webp",
    "storefront-coffee-fresh-food-aframe.png": "images/industries/convenience-retail.webp",
    "marlboro-gas-pump-promo.png": "images/industries/tobacco-nicotine.webp",
    "hanks-bbq-pylon-sign.png": "images/industries/qsr.webp",
    "snack-fresh-eat-well-cooler.png": "images/industries/grocery.webp",
    "corona-find-your-beach-beer-cave.png": "images/industries/beverage.webp",
    "grab-go-fresh-eats-cooler.png": "images/marquee/01-grab-go-cooler.webp",
    "hot-dog-combo-menu-signs.png": "images/marquee/02-menu-signs.webp",
    "karma-wellness-poster-frame.png": "images/marquee/03-poster-frame.webp",
    "vuex-pop-floor-display.png": "images/marquee/04-floor-display.webp",
    "fiji-stay-hydrated-pole-sign.png": "images/marquee/05-pole-sign.webp",
    "brunch-a-frame-sandwich-board.png": "images/marquee/06-a-frame.webp",
    "suspended-menu-board.png": "images/marquee/07-suspended-menu.webp",
    "three-flag-formats-showroom.png": "images/marquee/08-flag-formats.webp",
    "coke-pepsi-shelf-talkers.png": "images/marquee/09-shelf-talkers.webp",
    "newport-marlboro-pylon-toppers.png": "images/marquee/10-pylon-toppers.webp",
    "storefront-vinyl-lettering.png": "images/marquee/11-vinyl-lettering.webp",
}

print(f"Optimizing {len(mapping)} images...")
print("=" * 70)

success = 0
fail = 0

for src_name, dest_path in mapping.items():
    src_full = os.path.join(src, src_name)
    dest_full = os.path.join("public", dest_path)

    if os.path.exists(dest_full):
        size_kb = os.path.getsize(dest_full) / 1024
        print(f"~ SKIP (already exists): {dest_path} ({size_kb:.0f} KB)")
        success += 1
        continue

    if not os.path.exists(src_full):
        print(f"X MISSING SOURCE: {src_full}")
        fail += 1
        continue

    try:
        os.makedirs(os.path.dirname(dest_full), exist_ok=True)
        subprocess.run([
            "sharp", "-i", src_full, "-o", dest_full,
            "-f", "webp", "resize", "1600", "--", "--quality", "82"
        ], capture_output=True, text=True, check=True)
        size_kb = os.path.getsize(dest_full) / 1024
        print(f"OK {src_name[:40]:<40} -> {dest_path[:40]:<40} ({size_kb:>5.0f} KB)")
        success += 1
    except subprocess.CalledProcessError as e:
        print(f"X FAILED: {src_name}")
        print(f"   stderr: {e.stderr[:200]}")
        fail += 1

# Copy QSR to marquee 12
qsr_src = "public/images/industries/qsr.webp"
qsr_dst = "public/images/marquee/12-qsr-pylon.webp"
if os.path.exists(qsr_src) and not os.path.exists(qsr_dst):
    shutil.copy2(qsr_src, qsr_dst)
    print("OK Copied qsr.webp to marquee/12-qsr-pylon.webp")

# Build gallery
print("\n" + "=" * 70)
print("Building gallery folder...")
gallery_order = [
    ("hero/hero-primary.webp", "01-hero-storefront-coca-cola"),
    ("industries/convenience-retail.webp", "02-convenience-storefront"),
    ("industries/beverage.webp", "03-corona-beer-cave"),
    ("industries/qsr.webp", "04-qsr-bbq-pylon"),
    ("industries/grocery.webp", "05-grocery-fresh-eats"),
    ("industries/tobacco-nicotine.webp", "06-tobacco-marlboro"),
    ("services/signage-programs.webp", "07-storefront-window-cling"),
    ("services/graphic-design.webp", "08-qsr-hangry-burger-menu"),
    ("services/custom-print-production.webp", "09-cooler-doors-graphics"),
    ("services/store-surveys.webp", "10-gas-pump-celsius-topper"),
    ("services/direct-store-delivery.webp", "11-circle-k-hot-food-flag"),
    ("services/product-photography.webp", "12-iced-coffee-dispenser"),
    ("marquee/01-grab-go-cooler.webp", "13-grab-go-cooler"),
    ("marquee/02-menu-signs.webp", "14-hot-dog-combo-signs"),
    ("marquee/03-poster-frame.webp", "15-karma-poster-frame"),
    ("marquee/04-floor-display.webp", "16-vuex-pop-floor-display"),
    ("marquee/05-pole-sign.webp", "17-fiji-pole-sign"),
    ("marquee/06-a-frame.webp", "18-brunch-a-frame"),
    ("marquee/07-suspended-menu.webp", "19-suspended-menu-board"),
    ("marquee/08-flag-formats.webp", "20-three-flag-formats"),
    ("marquee/09-shelf-talkers.webp", "21-coke-pepsi-shelf-talkers"),
    ("marquee/10-pylon-toppers.webp", "22-newport-marlboro-pylons"),
    ("marquee/11-vinyl-lettering.webp", "23-storefront-vinyl-lettering"),
]

gallery_count = 0
for rel_path, gallery_name in gallery_order:
    src_full = os.path.join("public/images", rel_path)
    dest_full = f"public/images/gallery/{gallery_name}.webp"
    if os.path.exists(src_full) and not os.path.exists(dest_full):
        shutil.copy2(src_full, dest_full)
        gallery_count += 1

print(f"OK Gallery: {gallery_count} new images copied")

# Summary
print("\n" + "=" * 70)
print(f"COMPLETE: {success} optimized, {fail} failed")

total_bytes = 0
for root, dirs, files in os.walk("public/images"):
    for f in files:
        total_bytes += os.path.getsize(os.path.join(root, f))

print(f"Total size of public/images/: {total_bytes / 1024 / 1024:.1f} MB")
print(f"Reduction from original 46 MB: {(1 - (total_bytes / 1024 / 1024) / 46) * 100:.0f}%")
