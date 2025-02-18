#!/bin/bash
while true; do
    if xset q | grep "Caps Lock:   on"; then
        espeak "Caps Lock is ON"
    fi
    sleep 1
done
