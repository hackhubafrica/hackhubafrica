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
use ('theprimeagen/harpoon')
use ('mbbill/undotree')
use {'kassio/neoterm'}
use{'nvim-telescope/telescope-fzf-native.nvim',
  run = 'make'
}
use ('tpope/vim-fugitive') 
use ('tpope/vim-dispatch')
use ('skywind3000/asyncrun.vim')    -- For running commands asynchronously
use ('tpope/vim-commentary')
use {
	'VonHeikemen/lsp-zero.nvim',
	requires = {
		{'neovim/nvim-lspconfig'},
		{'hrsh7th/nvim-cmp'},
		{'williamboman/mason.nvim'},	
		{'williamboman/mason-lspconfig.nvim'},
		{'hrsh7th/cmp-buffer'},
		{'hrsh7th/cmp-path'},
		{'hrsh7th/cmp-nvim-lsp'},
		{'hrsh7th/cmp-nvim-lua'},
		{'saadparwaiz1/cmp_luasnip'},
		{'rafamadriz/friendly-snippets'},
	}
}
end)


