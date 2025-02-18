import sublime
import sublime_plugin
import os
import subprocess

class ActivateVirtualenvCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        # Get the folder where the current file is located
        folder = os.path.dirname(self.view.file_name())
        
        # Define potential names for the virtual environment folder
        venv_folders = ["venv", ".env", "env", "myenv"]

        # Try to find the virtual environment folder in the current directory
        venv_path = None
        for folder_name in venv_folders:
            possible_path = os.path.join(folder, folder_name)
            if os.path.exists(possible_path):
                venv_path = possible_path
                break
        
        if venv_path:
            # Check if it's a Unix-based system or Windows
            if os.name == "nt":  # For Windows
                activate_script = os.path.join(venv_path, "Scripts", "activate.bat")
            else:  # For Linux/macOS
                activate_script = os.path.join(venv_path, "bin", "activate")
            
            # Run the activation script using subprocess
            try:
                subprocess.call(f"source {activate_script}", shell=True)
                sublime.status_message(f"Activated virtual environment: {venv_path}")
            except Exception as e:
                sublime.status_message(f"Failed to activate virtual environment: {str(e)}")
        else:
            sublime.status_message("No virtual environment found in the current directory.")
