
    [
    
        { "keys": ["f5"], "command": "build" },
        { "keys": ["f7"], "command": "build", "args": {"select": true} },
        { "keys": ["ctrl+alt+c"], "command": "cancel_build" },
    
        {
            "keys": ["ctrl+`"], // Replace with your preferred shortcut
            "command": "terminus_open",
            "args": {
                "config_name": "Default", // or "bash", "zsh", etc. based on your setup
                "cwd": "${file_path:${folder}}", // Open terminal in the current file's directory
                "panel_name": "Terminus", // This ensures it opens in a panel at the bottom
                "pre_window_hooks": []
            }
        }
    ]

