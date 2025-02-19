# Vim

Below are the steps to install vim-plug and get your plugins working:

## 1. Install vim-plug

For Vim (not GVim), run the following command in your terminal:

```bash
curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

For `GVim`, the same command applies because both use the same .vim configuration.

This command downloads the plug.vim script and places it in the proper autoload directory so that Vim can load it automatically.

Here's what each part does:

* `curl` - This is a command-line tool used for transferring data using various protocols (HTTP, HTTPS, FTP, etc.).
* `-f` - Stands for "fail silently" on server errors (HTTP codes 400 and above). It makes sure that if the download fails, curl will exit with an error instead of outputting an error page.
* `-L` - Tells curl to follow HTTP redirects. Sometimes, the URL you provide might redirect to another location, and this option ensures that curl follows those redirects automatically.
* `-o ~/.vim/autoload/plug.vim` - The -o option specifies the output file. In this case, it saves the downloaded content to the file plug.vim inside the \~/.vim/autoload/ directory. This is the location where Vim looks for autoloaded scripts, and placing plug.vim here allows Vim to load the vim-plug plugin manager automatically.
* `--create-dirs` - This option instructs curl to create the directory structure (\~/.vim/autoload/) if it doesn't already exist.

URL: https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim

This is the direct URL to the plug.vim script hosted on GitHub. The script is the core of the vim-plug plugin manager, and downloading it to the autoload directory makes it available for Vim to use.

### What Does This Command Do?

Download the vim-plug Script: The command fetches the latest version of the vim-plug script from its official repository on GitHub.

### Ensure Proper Installation Location:

By saving it to \~/.vim/autoload/plug.vim, Vim can automatically load vim-plug when it starts, allowing you to use its functions (like plug#begin() and plug#end() in your .vimrc).

### Creates Necessary Directories:

If the \~/.vim/autoload/ directory doesn't exist, the --create-dirs option ensures it's created so that the file can be saved there.

Overall, this command is a one-line installer for vim-plug, making it easy to set up this plugin manager without manually downloading and placing the file in the right location.

## 2. Verify Your .vimrc Configuration

Make sure your .vimrc (or the plugin section in your .vimrc) looks similar to the following:

```sh
" Initialize vim-plug
call plug#begin('~/.vim/plugged')

" List the plugins you want to install
Plug 'preservim/nerdtree'
Plug 'tpope/vim-fugitive'

" End plugin section
call plug#end()
```

Notes:

Ensure that you use call plug#begin() and call plug#end() (with the call keyword) because they are Vimscript function calls. The plugin names should be enclosed in single quotes as shown.

## 3. Restart Vim and Install Plugins

Restart Vim or GVim. Run the command :PlugInstall inside Vim. This command tells vim-plug to download and install all the plugins you listed in your .vimrc. You should see a window where vim-plug downloads and installs the plugins. Once it finishes, your plugins will be available.

## 4. Troubleshooting

Incorrect Plugin Manager: If you intended to use a `different plugin manager` (such as Vundle or Pathogen), note that their configuration commands differ from `vim-plug’s`. For example, Vundle uses Plugin commands and has its own initialization functions. In your error output, you see both plug#begin and Plugin ..., so make sure you’re using one consistent plugin manager.

Check Vim Version and Runtime Path: Ensure that your Vim is not an `older version` that might have issues with the autoload directory or plugins. You can check your version by running `vim --version`

## General Productivity Plugins

* vim-plug Plugin Manager – (You already have this.) It makes installing and managing plugins simple.
* NERDTree File System Explorer – Quickly browse and open files and directories.
* vim-airline Status Line Enhancement – Provides a sleek status/tab line with useful information. You can also add themes via vim-airline-themes.
* vim-commentary or nerdcommenter Commenting Helper – Easily comment and uncomment code blocks.
* vim-surround Editing Text Objects – Quickly change surrounding characters (like quotes, parentheses, etc.).
* ctrlp.vim Fuzzy File Finder – Quickly open files by fuzzy-searching your project files.

### 2. Language-Specific Plugins

Python

* jedi-vim Code Completion and Navigation – Uses the Jedi library for powerful Python autocompletion and code navigation.
* black Code Formatter – Although Black is a standalone tool, there are Vim integrations available that automatically format your Python code. (You might run Black from the command line or integrate it with ALE or another linter/formatter plugin.)
* ALE (Asynchronous Lint Engine) Linting and Fixing – Provides real-time linting and can integrate with various linters (like flake8, pylint) and formatters for Python.
* vim-python-pep8-indent Improved Indentation – Helps maintain proper indentation according to PEP8.
* C/C++ coc.nvim Intellisense/Autocompletion – A modern autocompletion engine that supports many languages including C/C++ through extensions. Alternatively, you could use YouCompleteMe for C/C++ autocompletion, but note it requires a compilation step during installation.
* ALE Linting and Fixing – Supports many C/C++ linters and fixers (like clang-tidy, clang-format).
* Tagbar Code Structure Viewer – Displays tags of the current file (functions, variables, etc.) using ctags. Make sure you have Exuberant Ctags or Universal Ctags installed.
* vim-clang-format Code Formatter – Integrates clang-format to format your C/C++ code.
* Bash/Shell Scripting bash-support.vim Bash Script Helper – Provides snippets and functions to ease writing and navigating Bash scripts.
* vim-polyglot Language Pack – A collection of language packs that improves syntax highlighting and file detection for many languages including Bash, Markdown, Python, and more.
* Markdown vim-markdown Markdown Syntax & Folding – Enhances Markdown editing with improved syntax highlighting, folding, and some additional features for writing Markdown.
* markdown-preview.nvim Live Preview – Provides a live preview of your Markdown files in a web browser (requires Node.js).
* vim-pandoc and vim-pandoc-syntax Pandoc Integration – If you work with Pandoc, these plugins provide enhanced syntax and command support for Pandoc-flavored Markdown.

#### Example vim-plug Configuration

You can add the following to your \~/.vimrc (or \~/.gvimrc if you want GUI-specific settings) to load a selection of these plugins. Adjust the list based on what you plan to use:

```sh
" Begin plugin section
call plug#begin('~/.vim/plugged')

" General Plugins
Plug 'junegunn/vim-plug'           " vim-plug itself, though not strictly necessary here
Plug 'preservim/nerdtree'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'tpope/vim-commentary'
Plug 'tpope/vim-surround'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'sheerun/vim-polyglot'

" Python Plugins
Plug 'davidhalter/jedi-vim'
Plug 'psf/black'
Plug 'Vimjas/vim-python-pep8-indent'

" C/C++ Plugins
Plug 'neoclide/coc.nvim', {'branch': 'release'}    " or use YouCompleteMe if preferred
Plug 'dense-analysis/ale'
Plug 'majutsushi/tagbar'
Plug 'rhysd/vim-clang-format'

" Bash/Shell Scripting
Plug 'vim-scripts/bash-support.vim'

" Markdown Plugins
Plug 'plasticboy/vim-markdown'
Plug 'iamcco/markdown-preview.nvim', { 'do': 'cd app && yarn install' }  " Requires Node.js, if you want live preview
Plug 'vim-pandoc/vim-pandoc'
Plug 'vim-pandoc/vim-pandoc-syntax'

" End plugin section
call plug#end()
```

Note:

Some plugins (like coc.nvim or markdown-preview.nvim) may have additional installation instructions or dependencies (e.g., Node.js for markdown-preview.nvim, a build step for YouCompleteMe, etc.). Check the individual plugin documentation on GitHub for details. You don’t have to use every plugin listed here. Start with the ones you need most and add more as you refine your workflow.

1. Additional Considerations Linting & Formatting: ALE is a great general-purpose linting/fixing plugin, but you may also explore Syntastic if you prefer its style.

Code Navigation: Tagbar (with ctags installed) can be a lifesaver when working on large codebases.

Autocompletion: Modern setups often lean towards coc.nvim for its extensive language server support. It can handle many languages using language servers (like Pyright for Python, clangd for C/C++, etc.).

Customization: Customize each plugin’s settings in your \~/.vimrc or \~/.gvimrc as needed (refer to each plugin’s documentation for available options).

By installing and configuring a few of these plugins, you can create a powerful, multi-language development environment in Vim/GVim tailored to your workflow. Feel free to ask more questions as you refine your setup!

## nvim\_setup

```sh
cd .config/
mkdir nvim
cd nvim
git clone --depth 1 https://github.com/wbthomason/packer.nvim ~/.local/share/nvim/site/pack/packer/start/packer.nvim\n

nvim ~/.config/nvim/lua/plugins.lua
```

```sh
dante@Archie ~/.config/nvim/lua $ cd theprimeagen
dante@Archie ~/.config/nvim/lua/theprimeagen $ ls
init.lua  packer.lua  remap.lua
dante@Archie ~/.config/nvim/lua/theprimeagen $ cat init.lua
require("theprimeagen.remap")
print("hello from the primeagen")
dante@Archie ~/.config/nvim/lua/theprimeagen $ cat remap.lua
vim.g.mapleader = " "
vim.keymap.set("n", "<leader>pv", vim.cmd.Ex)
vim.keymap.set("n", '<C-s>' ,vim.cmd.w)
vim.keymap.set("n", '<C-w>', vim.cmd.wq)
vim.keymap.set("n", '<C-q>' ,vim.cmd.qa)

dante@Archie ~/.config/nvim/lua/theprimeagen $ cat packer.lua
-- This file can be loaded by calling `lua require('plugins')` from your init.vim

-- Only required if you have packer configured as `opt`
vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
  -- Packer can manage itself
  use 'wbthomason/packer.nvim'

  use {
  'nvim-telescope/telescope.nvim', tag = '0.1.8',
-- or                            , branch = '0.1.x',
  requires = { {'nvim-lua/plenary.nvim'} }
}
 use ({
         'rose-pine/neovim',
         as = 'rose-pine',
         config = function()
                 vim.cmd('colorscheme rose-pine')
        end
 })
use ('nvim-treesitter/nvim-treesitter', {run = ':TSUpdate'})
use ('nvim-treesitter/playground')
use ('mbbill/undotree')
use ('tpope/vim-fugitive')
use {
        'VonHeikemen/lsp-zero.nvim',
        requires = {
                {'neovim/nvim-lspconfig'},
                {'williamboman/mason.nvim'},
                --Autocompletion
                {'hrsh7th/nvim-cmp'},
                {'hrsh7th/cmp-buffer'},
                {'hrsh7th/cmp-path'},
                {'hrsh7th/cmp-nvim-lsp'},
                {'hrsh7th/cmp-nvim-lua'},
                {'saadparwaiz1/cmp_luasnip'},
                --Snippets
                {'rafamadriz/friendly-snippets'},
        }
}

end)
```
