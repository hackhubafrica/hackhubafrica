#!/bin/bash
if xset q | grep -q "Caps Lock:   on"; then
    echo "CAPS ON"
else
    echo "caps off"
fi
