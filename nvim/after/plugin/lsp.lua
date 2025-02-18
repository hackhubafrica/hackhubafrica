-- lsp.lua

local lsp = require("lsp-zero")

-- Optional: Set preset if needed
-- lsp.preset("recommended")

-- Setup lsp-zero
lsp.setup()

-- Setup Mason to ensure LSP servers are installed
local mason = require("mason")
mason.setup()

-- Ensure specific LSP servers are installed using mason
require("mason-lspconfig").setup({
  ensure_installed = { 
    'eslint', 
    'rust_analyzer', 
    'clangd', 
    'pyright' 
  },
})
-- on_attach function to set up keymaps
local on_attach = function(client, bufnr)
    local buf_map = function(mode, lhs, rhs, opts)
        opts = opts or {}
        opts.buffer = bufnr
        vim.api.nvim_buf_set_keymap(bufnr, mode, lhs, rhs, opts)
    end

    -- Example key mappings
    buf_map('n', '<leader>gd', '<cmd>lua vim.lsp.buf.definition()<CR>', { noremap = true, silent = true })
    buf_map('n', '<leader>gr', '<cmd>lua vim.lsp.buf.references()<CR>', { noremap = true, silent = true })

    -- More key mappings for LSP functions...
end


