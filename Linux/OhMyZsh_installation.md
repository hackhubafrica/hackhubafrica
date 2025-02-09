# Table of Contents

  Installing ZSH and Oh-My-Zsh on Fedora 32
        Run System Update
        Install ZSH on Fedora 32
        Configure ZSH on Fedora 32
        Install and Configure Oh-my-Zsh on Fedora 32
            Install oh-my-zsh on Fedora 32
            Configure Oh-My-Zsh on Fedora 32
            Oh-My-Zsh Theme Configuration
            How to use multiple ZSH themes
            Using Custom Oh-My-ZSH Themes
            Install Powerlevel10k Oh-My-Zsh Theme on Fedora 32
            Download and Install Powerlevel10k Oh-My-Zsh Theme
# Enabling Oh-My-Zsh Plugins on Fedora 32
       
Installing ZSH and Oh-My-Zsh on Fedora 32
Run System Update

To begin with, update your system packages.

    dnf update

Install ZSH on Fedora 32

Zsh is available on the default Fedora repositories and hence, you can simply install it by executing the command below;

    dnf install zsh


============================================================================================================================================================================
 Package                               Architecture                             Version                                      Repository                                Size
============================================================================================================================================================================
Installing:
 zsh                                   x86_64                                   5.8-1.fc32                                   fedora                                   2.9 M

Transaction Summary
============================================================================================================================================================================
Install  1 Package

Total download size: 2.9 M
Installed size: 7.6 M
Is this ok [y/N]: y

Once the installation is done, you can check the version of the install ZSH by executing the command below;

    zsh --version

zsh 5.8 (x86_64-redhat-linux-gnu)

# Configure ZSH on Fedora 32

To begin the configuration of ZSH on Fedora 32, you need to change your default shell interpreter to ZSH.

For example, I am currently logged in to my Fedora 32 as user koromicha.

    [koromicha@fedora32 ~]$ whoami

koromicha

With my current shell being bash;

    echo $SHELL

/bin/bash

# Now, to change your shell, 
you can use usermod or chsh command. For example, to change the default shell for the user koromicha, simply run;

    sudo usermod -s $(which zsh) koromicha

You can as well simply change your shell using chsh command.

     chsh -s $(which zsh)

Close the current terminal and open a new one to use your new shell. Upon opening a new terminal, the ZSH configuration wizard, similar to the one shown in the screenshot below, should pop up with some initial ZSH configuration options;
Install and Setup ZSH and Oh-My-Zsh on Fedora 32

You can simply press q to quit the configuration wizard and proceed to configure ZSH on Fedora 32.

After that, you should be able to see your shell prompt change from bash;

[koromicha@fedora32 ~]$

to ZSH;

[koromicha@fedora32]~%

See the trailing $ for bash and % for zsh.

If you can now check your default shell;

     echo $SHELL

/usr/bin/zsh

# Install and Configure Oh-my-Zsh on Fedora 32

We now have ZSH in place. But we want to go further and customize its appearance. To achieve this, we will use the oh-my-zsh framework.
Install oh-my-zsh on Fedora 32

# Oh-my-Zsh framework can be installed by either using the curl or wget commands as shown below;

    sudo dnf install wget curl

    sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# or

    sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"

Upon installation, you will see yet another change in the appearance of your terminal.
oh my zsh
Configure Oh-My-Zsh on Fedora 32

We now want the “oh-my-zsh” feeling!!! So let us proceed and configure this.

The Oh-my-Zsh configuration files are located under ~/.oh-my-zsh/ directory. Note that when you installed oh-my-zsh, it created the default ZSH configuration file under $HOME. The default configuraiton file for ZSH is ~/.zshrc. This is based on the ~/.oh-my-zsh/templates/zshrc.zsh-template template.
Oh-My-Zsh Theme Configuration

Oh-My-Zsh themes are located under ~/.oh-my-zsh/themes/ folder.

To change the ZSH themes, open the configuration file, ~/.zshrc, and set the value of ZSH_THEME= to the name of your preferred theme.

    vim $HOME/.zshrc

If you check, robbyrussel is the default theme for ZSH.

...
# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"
...

Therefore, to replace or change your ZSH theme, get the name of the theme from $HOME/.oh-my-zsh/themes/ folder and substitute the robbyrussell with the new name of your preferred theme.

For example, to change the themes to agnoster theme, $HOME/.oh-my-zsh/themes/agnoster.zsh-theme,

    ZSH_THEME="agnoster"

Reload the ~/.zshrc to effect the changes everytime you make changes.

    source ~/.zshrc

This is how agnoster theme changes the shell prompt to look like;
zsh agnoster
# How to use multiple ZSH themes

If you want to use multiple selected themes randomly, edit the $HOME/.zshrc and set the theme to random.

    ZSH_THEME="random"

Then, define the random themes to make a selection from;

    ZSH_THEME_RANDOM_CANDIDATES=( "gnzh" "agnoster" "robbyrussel" )

Check more themes on oh my zsh themes Github repository.
Using Custom Oh-My-ZSH Themes

There exists a whole lot of oh-my-zsh custom theme options to beef up your zsh that you can choose from. These themes are available as external Oh-my-zsh themes.

Oh-my-zsh custom themes can be installed on $ZSH_CUSTOM directory;

    echo $ZSH_CUSTOM

    ~/.oh-my-zsh/custom

One of the custom themes that i usually like using is the Powerlevel10k Theme. So, for demo purpose, let us see how to install this theme;
# Install Powerlevel10k Oh-My-Zsh Theme on Fedora 32

To install and use Powerlevel10k theme, you first need to install the recommended font, Meslo Nerd Font patched for Powerlevel10k.

Download Meslo Nerd Font patched for Powerlevel10k fonts;

cd $HOME/Downloads

    wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf

    wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf

    wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf

    wget https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf
 
To instal the fonts, navigate to the downloads directory and double click and install each one of them so as to make MesloLGS NF font available system wide.

Next, configure your terminal to use Powerlevel10k MesloLGS NF font. Each type of terminal has a different way in which it can be configured to use this theme.

On GNOME terminal;

  Right click anywhere on the terminal and select Preferences.
    On the selected profile, under Profiles, check Custom font under Text Appearance and select MesloLGS NF Regular.
    Once you set the theme, close the Preferences window.

gnome meslo font 1
Download and Install Powerlevel10k Oh-My-Zsh Theme

Download and install Powerlevel10k oh-my-zsh theme by running the command below;

    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git $ZSH_CUSTOM/themes/powerlevel10k

Once Powerlevel10k theme is in place, edit the Zsh configuration file, $HOME/.zshrc, and change the theme to powerlevel10k/powerlevel10k.

    vim $HOME/.zshrc

...
# ZSH_THEME="robbyrussell"
# ZSH_THEME="agnoster"
ZSH_THEME="powerlevel10k/powerlevel10k"

Save and exit the Zsh configuration then reload the configs.

    source ~/.zshrc

Upon reloading Zsh configs, Powerlevel10k configuration wizard is launched and it will ask a few questions so as to configure your prompt. Answer the questions appropriately.
pwl10k prompt

Select your shell promt.

Configure how you want your prompt to look like by going through a series of provided questions. Save the changes when done and your Powerlevel10k prompt now looks like highlighted section of the screenshot.
oh my zsh pl10k

Basically, below are the options that I chose to get the above prompt;

  Prompt style: (3) Rainbow.
    Character set: (1) Unicode.
    Show current time: 24 hour
    Prompt Separators: (2) Vertical.
    Prompt Heads: (1) Sharp.
    Prompt Tails: (3) Sharp.
    Prompt Height: (2) Two lines.
    Prompt Connection: (1) Disconnected.
    Prompt Frame: (2) Left.
    Frame Color: (2) Light.
    Prompt Spacing: (2) Sparse.
    Icons: (2) Many icons.
    Prompt Flow: (1) Concise.
    nable Transient Prompt?: (n) No.
    Instant Prompt Mode: (1) Verbose (recommended).

# Enabling Oh-My-Zsh Plugins on Fedora 32

There are a ton of oh-my-zsh plugins to further spice up your shell. Plugins are stored under,  ~/.oh-my-zsh/plugins. It is also possible to define custom plugin location, like, ~/.oh-my-zsh/custom/plugins. 

Plugins can be enabled by defining them under the plugins section on ~/.zshrc config file.

For example, to easily prefix your current or previous commands with sudo by pressing Escape key twice

vim ~/.zshrc

# Which plugins would you like to load?
# Standard plugins can be found in ~/.oh-my-zsh/plugins/*
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git sudo)

Save and exit the shell. Then source ~/.zshrc for the changes to take effect.

source ~/.zshrc

The verify the plugin by running type a command and press escape key twice to prefix it with sudo.

Each and every plugin has a readme file on what it does. Be sure to check.


# Download zsh-syntax-highlighting from the git repository

Clone the “zsh-syntax-highlighting” repository from github.com onto your local system.

    git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
