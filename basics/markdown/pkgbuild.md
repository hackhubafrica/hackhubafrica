# PKGBUILD

## What Are `PKGBUILD` Files?

A **`PKGBUILD`** file is a script used in the **Arch Linux Packaging System** to automate the building, installation, and distribution of software. It is an essential component of **Arch's package manager (pacman)** and the **Arch User Repository (AUR).**

`PKGBUILD` files define:

How to **fetch** the source code How to **compile/build** the software How to package it into an installable format (.pkg.tar.zst) How to **install** dependencies

`PKGBUILD` files are commonly used for:

* **Shipping binaries** efficiently
* **Compiling software from source** with custom configurations
* **Creating portable, reproducible builds** for different environments

`PKGBUILD` files are specific to Arch Linux and its derivatives (e.g., Manjaro, EndeavourOS, Garuda). They are part of the Arch Build System (ABS) and the Arch User Repository (AUR), used to build and package software for pacman, Arch's package manager.

However, other Linux distributions have similar packaging systems but use different formats and tools. Below is a comparison:

### Packaging Systems in Different Distributions

| Distribution  | Package Manager | Build System         | Package Format |
| ------------- | --------------- | -------------------- | -------------- |
| Arch Linux    | pacman          | PKGBUILD (ABS/AUR)   | .pkg.tar.zst   |
| Debian/Ubuntu | apt/dpkg        | debuild, dh\_make    | .deb           |
| Fedora/RHEL   | dnf/rpm         | rpmbuild, spec files | .rpm           |
| Gentoo        | emerge          | ebuild               | Source-based   |
| NixOS         | nix             | Nix Expressions      | .drv           |
| Void Linux    | xbps            | srcpkg               | .xbps          |

Each system has a similar role to `PKGBUILD`, but with different syntax and tools.

#### 🟢 Debian/Ubuntu: `.deb` Packaging (Control Files)

Uses `debuild`, `dpkg`, and `control` files. Equivalent to `PKGBUILD` but more complex (multiple scripts). Example control file for a Debian package:

```bash
Package: mysoftware
Version: 1.0
Section: utils
Priority: optional
Architecture: amd64
Depends: libc6 (>= 2.31)
Maintainer: Your Name <you@example.com>
Description: A simple program
```

#### 🔴 Fedora/RHEL: `.rpm`Packaging (SPEC Files)

Uses rpmbuild and .spec files. Equivalent to `PKGBUILD` but with more detailed control over build steps. Example .spec file:

```bash
Name: mysoftware
Version: 1.0
Release: 1%{?dist}
Summary: A simple program
License: GPLv3
Source0: https://example.com/mysoftware-1.0.tar.gz
BuildRequires: gcc, make
Build with:
rpmbuild -ba mysoftware.spec
```

#### 🟠 Gentoo: ebuild (Portage)

Uses source-based builds similar to `PKGBUILD`. Example mysoftware-1.0.ebuild:

```bash
DESCRIPTION="A simple program"
HOMEPAGE="https://example.com"
SRC_URI="https://example.com/mysoftware-1.0.tar.gz"
LICENSE="GPL-3"
SLOT="0"
KEYWORDS="~amd64"
DEPEND="sys-devel/gcc"
Install with:
emerge mysoftware
```

#### 🟡 NixOS: nix Expressions

Uses declarative .nix files. Example default.nix:

```bash
{ stdenv, fetchurl }:
stdenv.mkDerivation {
  name = "mysoftware-1.0";
  src = fetchurl { url = "https://example.com/mysoftware-1.0.tar.gz"; };
  buildInputs = [ ];
}
Install with:
nix-build default.nix
```

> Why Use `PKGBUILD` Over Others?

* ✅ Advantages of `PKGBUILD` (Arch Linux)
  * Simple & Transparent (single script, no extra files like .spec or control).
  * Works with `source code` & `prebuilt binaries.`
  * AUR makes software distribution easy.
  * `Fast` & `lightweight` (no dependency resolution overhead).
* ❌ Limitations of `PKGBUILD`
  * Only for Arch-based distros.
  * No official package signing by default.
  * Not as widely adopted as .deb or .rpm.

> Can I Use `PKGBUILD` on Non-Arch Systems?

* Not natively, but you can convert `PKGBUILD`-based packages to .deb or .rpm using tools like makepkg, debootstrap, or alien.

For example:

```bash
makepkg -g
alien --to-deb mysoftware-1.0-1-x86_64.pkg.tar.zst
```

This converts an Arch package into a Debian package.

While `PKGBUILD` is Arch Linux-specific, other distributions have their own equivalents like .deb (Debian), .rpm (Fedora), and ebuild (Gentoo). The choice depends on the system you're working with.

1. Structure of a `PKGBUILD` File A typical `PKGBUILD` file consists of a set of variables and functions that define how the package is built and installed.

Example: `PKGBUILD` for a Simple C++ Program

```bash
# Maintainer Information
pkgname=mysoftware
pkgver=1.0
pkgrel=1
pkgdesc="A simple C++ application"
arch=('x86_64')
url="https://example.com"
license=('GPL3')
depends=('gcc' 'glibc')  # Dependencies

# Source Code
source=("https://example.com/mysoftware-$pkgver.tar.gz")
sha256sums=("SKIP")  # Replace with actual checksum

# Build Function
build() {
    cd "$srcdir/mysoftware-$pkgver"
    make
}

# Package Function
package() {
    cd "$srcdir/mysoftware-$pkgver"
    install -Dm755 mysoftware "$pkgdir/usr/bin/mysoftware"
}
```

2. Understanding Key Sections of `PKGBUILD`

***

pkgname |The name of the package pkgver |The version number pkgrel |Package release number (increment when making fixes) pkgdesc |Short description of the package arch |Target architecture (x86\_64, arm, any) url |Project’s homepage license |The license (e.g., MIT, GPL3) depends |List of dependencies source |URL or local path to source code sha256sums |Security checksums to verify file integrity build() |Commands for compiling the software package() |Commands for installing the compiled binaries

***

3. Using `PKGBUILD` to Ship Binaries Instead of compiling from source, you can ship precompiled binaries to speed up installation.

Example: `PKGBUILD` for Shipping a Precompiled Binary

```bash
pkgname=mysoftware-bin
pkgver=1.0
pkgrel=1
pkgdesc="A precompiled binary package"
arch=('x86_64')
url="https://example.com"
license=('MIT')
depends=('glibc')

# Precompiled binary instead of source code
source=("https://example.com/releases/mysoftware-$pkgver-linux-x86_64.tar.gz")
sha256sums=("SKIP")

package() {
    cd "$srcdir/mysoftware-$pkgver"
    install -Dm755 mysoftware "$pkgdir/usr/bin/mysoftware"
}
```

The `PKGBUILD` file i provide below is for the gr-osmosdr-git package,

```bash
# Maintainer: Cameron Will <cwill747@gmail.com>
# Contributor: Yunhui Fu <yhfudev@gmail.com>
# Contributor: 0xfc <sfc_0@yahoo.com.cn>
# Modified from rtl-sdr-git `PKGBUILD`

pkgname=gr-osmosdr-git
pkgver=0.2.1.5.gfe03d83
pkgrel=1
pkgdesc="GNU Radio source block for OsmoSDR, which is a 100% Free Software based small form-factor inexpensive SDR (Software Defined Radio) project."
arch=('i686' 'x86_64')
url="https://osmocom.org/projects/gr-osmosdr/wiki"
license=('GPL')
depends=(
    'gnuradio'
    'swig'
    'rtl-sdr'
    'libuhd'
    'libmirisdr-git'
    'libosmosdr-git'
    'airspy-git'
    )
makedepends=(
    'git'
    'cmake'
    'boost'
    'python-cheetah3'
    )
#optdepends=()
provides=('gr-osmosdr' 'gnuradio-osmosdr')

source=('git+https://git.osmocom.org/gr-osmosdr')
md5sums=('SKIP')
_gitname="gr-osmosdr"

pkgver() {
  cd $_gitname
  # Use the tag of the last commit
  git describe --always | sed 's|-|.|g; s|^.||'
}

build() {
  cd "$srcdir/$_gitname"
  mkdir -p build
  cd build
  cmake -DCMAKE_INSTALL_PREFIX=/usr ../
  make
}

package() {
  cd "$srcdir/$_gitname/build/"
  make DESTDIR=${pkgdir} install}
```

The `PKGBUILD` file i provided seems to be for the gr-osmosdr-git package, and it appears to be set up to build the software from the latest Git commit. However, before proceeding with the installation, let's walk through a few things to ensure everything is set up correctly:

`PKGBUILD` Breakdown Dependencies: The package has several dependencies, including gnuradio, swig, rtl-sdr, libuhd, libmirisdr-git, libosmosdr-git, and airspy-git. These should be installed and compatible with your environment.

Build Process: The build process includes creating a build directory, running cmake, and using make to compile the package. This is standard for CMake-based packages. The install process uses make DESTDIR=${pkgdir} install, which will install the compiled files into a temporary directory (${pkgdir}) before packaging them for installation.

Versioning: The pkgver() function dynamically generates the version number based on the last Git commit. This will ensure you're always getting the latest commit version.

Source: The source points to the Git repository for gr-osmosdr. This means i will be pulling the latest source code from osmocom.org.

Why Use Precompiled Binaries? Faster installation (no need to compile) Less dependency on build tools Easier for end users

4. Creating & Installing a Package with `PKGBUILD`

* Step 1: Create a `PKGBUILD` File Inside an empty directory:

```bash
mkdir mysoftware
cd mysoftware
nano `PKGBUILD`  # Paste your script here
```

* Step 2: Build the Package Run the following command in the same directory:

```bash
makepkg -si
```

This will:

Download the source/binary Compile (if necessary) Package it into .pkg.tar.zst Install the package Step 3: Share the Built Package Once built, you can share mysoftware-1.0-1-x86\_64.pkg.tar.zst. Users can install it with:

```bash
pacman -U mysoftware-1.0-1-x86_64.pkg.tar.zst
```

5. `PKGBUILD` in Software Development

* Automating Builds & CI/CD `PKGBUILD` files integrate into CI/CD pipelines to automate packaging and distribution. Arch Linux repositories like AUR use `PKGBUILD` for community-maintained software.
* Customizing Package Builds Users can modify `PKGBUILD` files to enable/disable features (e.g., custom compiler flags). Example: Change CFLAGS in the build() function for optimized performance.
* Archiving & Versioning `PKGBUILD` ensures consistent, reproducible builds across different machines. Versions are tracked via pkgver and pkgrel updates.

6. `PKGBUILD` Best Practices ✔ Always verify checksums (sha256sums) to prevent tampering. ✔ Use clean variables ($srcdir, $pkgdir) to avoid polluting the build environment. ✔ Test builds in a clean chroot:

```bash
extra-x86_64-build
```

✔ Avoid hardcoding paths; use:

```bash
install -Dm755 mysoftware "$pkgdir/usr/bin/mysoftware"
```

7. Conclusion `PKGBUILD` is a powerful tool for packaging, shipping, and automating software builds in Arch Linux. Whether you're compiling from source or distributing prebuilt binaries, it streamlines deployment and ensures a reproducible and efficient workflow.

