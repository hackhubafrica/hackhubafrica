#!/bin/bash

LOCK_FILE="/tmp/capslock_notify.lock"
if [ -e "$LOCK_FILE" ]; then
    exit 1
fi
touch "$LOCK_FILE"

# Store the previous state and timestamp of last notification
prev_state=$(xset q | grep "Caps Lock" | awk '{print $4}')
last_notify_time=0
notify_interval= 1  # time in seconds between notifications

while true; do
    current_state=$(xset q | grep "Caps Lock" | awk '{print $4}')
    current_time=$(date +%s)

    if [[ "$current_state" != "$prev_state" && $(($current_time - $last_notify_time)) -ge $notify_interval ]]; then
        if [[ "$current_state" == "on" ]]; then
            notify-send -u low "Caps Lock is ON"
        else
            notify-send -u low "Caps Lock is OFF"
        fi
        prev_state="$current_state"
        last_notify_time=$current_time
    fi
    sleep 0.1
done

rm -f "$LOCK_FILE"
