Changing the root or user password using a live USB drive involves booting from the live USB, mounting the filesystem of the installed OS, and then using chroot to change the root environment to that of the installed system. Here are the detailed steps to achieve this:
Step-by-Step Guide

 # Boot from Live USB:
       
  Insert your live USB drive into the computer and boot from it.
  Select the option to try or use the live environment (usually, "Try Ubuntu" or similar if you're using an Ubuntu-based live USB).

  # Open a Terminal:
       
  Once in the live environment, open a terminal.

  Identify the Root Partition:
        Find the root partition of your installed system using the lsblk or fdisk command.

   
    sudo lsblk

or

    sudo fdisk -l

Look for the partition where your root filesystem is located (usually something like /dev/sda1, /dev/nvme0n1p1, etc.).

# Mount the Root Partition:

    sudo mount /dev/sdX1 /mnt

Replace /dev/sdX1 with the actual root partition identified in the previous step.

# Mount the Necessary Filesystems:
    
    sudo mount --bind /dev /mnt/dev
    sudo mount --bind /proc /mnt/proc
    sudo mount --bind /sys /mnt/sys

# Chroot into the Mounted Filesystem:

    sudo chroot /mnt

This changes the root directory to the one on the mounted filesystem, effectively placing you in the installed system's environment.

# Change the Password:

To change the root password, use:

    passwd root

# To change a specific user's password, use:

    passwd username

Replace username with the actual username.

# Update the Initramfs (Optional but recommended):

  This step ensures that any changes to the password or user database are properly included in the initramfs.

    update-initramfs -u

# Exit the Chroot Environment:


    exit

Unmount the Filesystems:

    sudo umount /mnt/dev
    sudo umount /mnt/proc
    sudo umount /mnt/sys
    sudo umount /mnt

Reboot the System:

    sudo reboot

Remove the live USB drive when the system starts to reboot to boot into the installed system.

# Summary

By following these steps, you can change the root or user password on an installed system using a live USB drive. This process involves mounting the installed system's filesystem, using chroot to switch to the installed system's environment, changing the password, and then unmounting and rebooting.
