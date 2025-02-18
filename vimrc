set number                         " Show line numbers
"set relativenumber

syntax on                          " Syntax highlighting
set ignorecase                     " Search is case-insensitive
set hlsearch                       " Highlight search matches
set incsearch                      " Highlight first matches of searches while typing
set mouse=a

set expandtab                      " Insert spaces instead of tabs
set shiftwidth=4                   " Tab = 4 spaces
set softtabstop=4                  " Tab = 4 spaces
set backspace=indent,eol,start     " Modern backspace behavior
set autoindent
set clipboard=unnamedplus

call plug#begin('~/.vim/plugged')

" General Plugins
Plug 'preservim/nerdtree'
Plug 'tpope/vim-fugitive'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'tpope/vim-commentary'
Plug 'tpope/vim-surround'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'sheerun/vim-polyglot'
Plug 'mbbill/undotree'
Plug 'nvim-treesitter/nvim-treesitter' ,{'do':':TSUpdate'}
Plug 'nvim-treesitter/playground'

" Python Plugins
Plug 'davidhalter/jedi-vim'
Plug 'psf/black'
Plug 'Vimjas/vim-python-pep8-indent'

" Markdown Plugins
Plug 'plasticboy/vim-markdown'
Plug 'iamcco/markdown-preview.nvim', { 'do': 'cd app && yarn install' }  " Requires Node.js, if you want live preview
Plug 'vim-pandoc/vim-pandoc'
Plug 'vim-pandoc/vim-pandoc-syntax'
" C/C++ Plugins
Plug 'neoclide/coc.nvim', {'branch': 'release'}    " or use YouCompleteMe if preferred
Plug 'dense-analysis/ale'
Plug 'majutsushi/tagbar'
Plug 'rhysd/vim-clang-format'

" Bash/Shell Scripting
Plug 'vim-scripts/bash-support.vim'

" themes
Plug 'ryanoasis/vim-devicons'
Plug 'tiagofumo/vim-nerdtree-syntax-highlight' " Icons inside NERDTree
Plug 'morhetz/gruvbox'          " Gruvbox theme
Plug 'dracula/vim', { 'as': 'dracula' } " Dracula theme
Plug 'arcticicestudio/nord-vim' " Nord theme

call plug#end()


" Fix Home and End keys in tmux
if &term =~ "tmux"
    set term=xterm-256color
    map <Esc>[1~ <Home>
    map <Esc>[4~ <End>
endif
 
if exists('$TMUX')
    " Cursor style for tmux
    let &t_SI = "\e[5 q"  " Beam cursor in Insert mode
    let &t_EI = "\e[2 q"  " Block cursor in Normal mode
    let &t_SR = "\e[4 q"  " Underline cursor in Replace mode
else
    " Cursor style for normal terminals
    let &t_SI = "\e[6 q"  " Beam cursor in Insert mode
    let &t_EI = "\e[2 q"  " Block cursor in Normal mode
    let &t_SR = "\e[4 q"  " Underline cursor in Replace mode
endif

" pressing F2 will toggle paste mode ON/OFF.
set pastetoggle=<F2>

autocmd InsertEnter * set paste
autocmd InsertLeave * set nopaste

" ==========================
" custom key-bindigs
" ==========================
"nnoremap <C-t> :NERDTreeToggle<CR>
nnoremap <C-t> :tabnew<CR>
nnoremap <C-s> :w<CR>
nnoremap <C-w> :wq<CR>
nnoremap <C-q> :q!<CR>
nnoremap <C-x> :q<CR>
" ==========================
" Plugin Keybindings
" ==========================

" === NERDTree (File Explorer) ===
let mapleader = " "
nnoremap <leader>n :NERDTreeToggle<CR>
vnoremap <leader>n :NERDTreeToggle<CR>
inoremap <leader>n :NERDTreeToggle<CR>
" Switch to the next buffer
nnoremap <Tab> :bnext<CR>

" Switch to the previous buffer
nnoremap <S-Tab> :bprevious<CR>

" Close the current buffer
nnoremap <Leader>bd :bd<CR>

" Show buffer list and select one using fzf (if installed)
nnoremap <Leader>bl :ls<CR>:buffer<Space>

nnoremap <leader>bn :confirm bnext<CR>
nnoremap <leader>bp :confirm bprev<CR>
nnoremap <leader>bi :confirm buffers<CR>

nnoremap <leader>f :NERDTreeFind<CR>
vnoremap <leader>f :NERDTreeFind<CR>
inoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :so<CR>
nnoremap <leader>v :vs<CR>
nnoremap <leader>h :sp<CR>

" === Tagbar (Code Navigation) ===
nnoremap <leader>t :TagbarToggle<CR>

" === CtrlP (Fuzzy File Finder) ===
inoremap <leader>pf :CtrlP<CR>
nnoremap <leader>pv :Ex<CR>

" === ALE (Linting & Fixing) ===
nnoremap <leader>e :ALEFix<CR>
nnoremap <leader>l :ALELint<CR>

" === Vim-Fugitive (Git Integration) ===
nnoremap <leader>gs :Git<CR>
nnoremap <leader>gc :Git commit<CR>
nnoremap <leader>gp :Git push<CR>
nnoremap <leader>gl :Git pull<CR>

" === Markdown Preview ===
nnoremap <leader>m :MarkdownPreview<CR>
nnoremap <leader>ms :MarkdownPreviewStop<CR>

nnoremap <leader>u :UndotreeToggle<CR>

" === Jedi-Vim (Python Auto-completion & Navigation) ===
let g:jedi#completions_enabled = 1
let g:jedi#usages_command = '<leader>du'
let g:jedi#goto_command = '<leader>dg'

" === vim-commentary (Comment Code) ===
nnoremap <leader>/ :Commentary<CR>

" === Black (Python Formatter) ===
nnoremap <leader>bf :Black<CR>

" === vim-clang-format (C/C++ Formatter) ===
autocmd FileType c,cpp nnoremap <leader>cf :ClangFormat<CR>

" === vim-airline (Status Bar Theme) ===
let g:airline_powerline_fonts = 1

" === gruvbox / dracula (Themes) ===
colorscheme dracula  
"colorscheme gruvbox  
" === coc.nvim (Intelligent Completion) ===
" Show documentation for item under cursor
nnoremap <leader>d :call CocAction('doHover')<CR>
vnoremap <leader>d :call CocAction('doHover')<CR>
" Trigger completion
inoremap <silent><expr> <C-Space> coc#refresh()



