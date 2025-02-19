# Buffers

#### **🔹 What Are Buffers?**

A **buffer** is a temporary in-memory representation of an open file or unsaved text inside an editor. Think of buffers as **"open documents"** that you can switch between without closing them.

**🛠️ Buffers in Vim/Neovim/GVim**

* When you open a file in Vim, it gets loaded into a **buffer**.
* You can open **multiple buffers** at the same time without opening multiple windows or tabs.
* Buffers can hold **files, temporary text, or unsaved changes**.
* Even if a buffer is hidden, it remains in memory and can be switched back to.

**🛠️ Buffers in Emacs**

* **Emacs also uses buffers**, but it treats **everything as a buffer**, including files, help pages, terminal emulators, and interactive shells.
* Unlike Vim, Emacs does not have a strict "tab" system, as all content is just another buffer.

***

In **Vim, Neovim, and GVim**, you can **list all open buffers** and **switch between them** using the following commands:

#### **1️⃣ List All Open Buffers**

In normal mode, type:

```vim
:ls
```

or

```vim
:buffers
```

This will show a list of open buffers with their **buffer numbers**, status, and filenames.

* `#` → Indicates the alternate buffer
* `+` → The currently active buffer
* `%` → The current buffer
* `-` → Previously active buffer

***

#### **2️⃣ Switch Between Buffers**

You can switch between buffers using their **buffer number** or by cycling through them.

**Switch to a Specific Buffer by Number**

Use:

```vim
:buffer <buffer_number>
```

Example:

```vim
:buffer 3
```

(This will switch to buffer **3**.)

**Cycle Through Buffers**

* **Next Buffer:**

```vim
    :bnext
```

```
or simply

```

```vim
    :bn
```

* **Previous Buffer:**

```vim
    :bprevious
```

```
or simply
```

```vim
    :bp
```

**Switch to Last Used Buffer**

```vim
:b#
```

***

#### **3️⃣ Closing Buffers**

* **Close the current buffer without quitting Vim:**

```vim
    :bd
```

* **Close a specific buffer by number:**

```vim
    :bd <buffer_number>
```

```
Example:
```

```vim
    :bd 3
```

* **Close all buffers except the current one:**

```
    vim
    
    `:bufdo bd`
```

```
or
```

```vim
    :%bd|e#
```

***

#### **4️⃣ (Optional) Fuzzy Buffer Switching**

If you're using **Neovim with Telescope**:

```vim
:Telescope buffers
```

This will open a fuzzy search window for buffers.

***

&#x20;\# **custom key mapping** for faster buffer switching? 🚀

### **🔹 Custom Key Mappings for Faster Buffer Switching**

Here are some **handy key mappings** for navigating buffers quickly in Vim/Neovim. Add these to your `~/.vimrc` (Vim/GVim) or `~/.config/nvim/init.vim` (Neovim):

```sh
" Switch to the next buffer nnoremap <Tab> :bnext<CR>  " Switch to the previous buffer nnoremap <S-Tab> :bprevious<CR>  " Close the current buffer nnoremap <Leader>bd :bd<CR>  " Show buffer list and select one using fzf (if installed) nnoremap <Leader>bl :ls<CR>:buffer<Space>
```

#### **🔹 Explanation of Key Bindings**

* `<Tab>` → Move to the **next buffer**.
* `<Shift-Tab>` → Move to the **previous buffer**.
* `<Leader>bd` → **Delete** (close) the current buffer.
* `<Leader>bl` → **List buffers** and select one by typing its number.

> **Note:** The `<Leader>` key is usually mapped to `\` (backslash) or `<Space>` (which you can configure in your Vim settings).

***

### **🔹 Advanced: Buffer Navigation with Fuzzy Search (Neovim)**

If you use **Telescope (Neovim Plugin)**, you can add this key mapping:

```vim

`nnoremap <Leader>bb :Telescope buffers<CR>`
```

Now pressing `<Leader>bb` will **show a fuzzy search window** to switch between buffers quickly.

***

### **🔹 Want a Tab-Like Behavior with Buffers?**

Vim **tabs** and **buffers** are different concepts. If you want buffers to behave like tabs, try:

```vim
set hidden
```

This allows you to **switch buffers without closing unsaved files**.

***

#### **📌 Conclusion**

* **Buffers are temporary storage for open files** (like tabs in a browser but more lightweight).
* **Both Vim and Emacs use buffers**, but Emacs extends the concept further.
* **Key mappings make buffer switching faster** (`<Tab>`, `<S-Tab>`, `<Leader>bd`).
* **Telescope (Neovim) makes searching through buffers even smoother**.

Would you like an **autoclosing buffer manager** (like `BufOnly` or `bufkill.vim`) for better control? 🚀

Here’s the Lua version of your key mappings for Neovim. Add this to your **`init.lua`** or inside a **`lua`** configuration file like `~/.config/nvim/lua/keymaps.lua` and source it.

#### **🔹 Lua Key Mappings for Buffers**

```lua
-- Define a shortcut for setting keymaps 
local keymap = vim.keymap.set local opts = { noremap = true, silent = true }  
-- Switch to the next buffer 
keymap("n", "<Tab>", ":bnext<CR>", opts)  -- Switch to the previous buffer 
keymap("n", "<S-Tab>", ":bprevious<CR>", opts)  
-- Close the current buffer 
keymap("n", "<Leader>bd", ":bd<CR>", opts)  
-- Show buffer list and select one using FZF (if installed) 
keymap("n", "<Leader>bl", ":ls<CR>:buffer<Space>", opts)  -- Show buffer list using Telescope (if installed) 
keymap("n", "<Leader>bb", ":Telescope buffers<CR>", opts)
```

#### **🔹 Explanation**

* `vim.keymap.set(mode, key, command, options)`
  * `"n"` → **Normal mode**
  * `"<Tab>"` → **Keybinding**
  * `":bnext<CR>"` → **Command executed**
  * `{ noremap = true, silent = true }` → **Prevents recursive mapping and suppresses output** This format is **more efficient** in Neovim and follows modern Lua-based configurations.

Would you like **buffer closing improvements** (e.g., `bdelete` vs `bwipeout`)? 🚀

## Replacing Words

You can achieve this functionality in **Neovim/Vim** by setting up a **key mapping** that:

1. **Selects the word under the cursor** or allows you to **visually select** a word.
2. **Highlights all occurrences of the word in the document**.
3. **Allows you to replace the word with an alternative easily**.

***

#### **🔹 Lua Key Mapping (for Neovim)**

Add this to your **`init.lua`** (or `keymaps.lua` if you separate configs):

```lua
local keymap = vim.keymap.set local opts = { noremap = true, silent = true }  
-- Search and highlight all occurrences of the selected word 
keymap("n", "<Leader>h", ":%s/<C-r><C-w>//g<Left><Left>", opts)  
-- Same for visual mode (select a word, then press Leader-h) 
keymap("v", "<Leader>h", '"hy:%s/<C-r>h//g<Left><Left>', opts)  
-- Alternative: Use Ctrl-H instead of Leader-h 
keymap("n", "<C-h>", ":%s/<C-r><C-w>//g<Left><Left>", opts) 
keymap("v", "<C-h>", '"hy:%s/<C-r>h//g<Left><Left>', opts)`
```

***

#### **🔹 Explanation**

* **`<C-r><C-w>`** → Inserts the word under the cursor into the command line.
* **`:%s/word//g`** → Searches (`s/`) the entire file (`%`) for occurrences of `word` and prepares for replacement.
* **`<Left><Left>`** → Moves the cursor left twice so you can type the replacement word easily.
* **Visual mode (`v`)**:
  * `h` is used as a register to store the selected text (`"hy`).
  * The word is then inserted into the search pattern with `<C-r>h`.

***

#### **🔹 How to Use**

4. **Move the cursor to a word** (or visually select a word).
5. **Press `<Leader>h`** (or `<C-h>` if you prefer).
6. **All occurrences of the word will be highlighted**.
7. **Type the replacement word and press `<Enter>`**.

If you want to **manually confirm each replacement** instead of replacing all occurrences at once, you can use **Vim’s interactive substitution mode** with the `c` (confirm) flag.

***

#### **🔹 Updated Key Mappings for Manual Confirmation**

Modify your **Neovim `init.lua`** (or `keymaps.lua` file) to use `c` for **confirming each replacement**:

```lua
local keymap = vim.keymap.set local opts = { noremap = true, silent = true }  
-- Search and manually replace each instance of the word under the cursor 
keymap("n", "<Leader>h", ":%s/<C-r><C-w>//gc<Left><Left><Left>", opts)  
-- Same functionality for visual mode (select a word, then press Leader-h) 
keymap("v", "<Leader>h", '"hy:%s/<C-r>h//gc<Left><Left><Left>', opts)  
-- Alternative: Use Ctrl-H instead of Leader-h for manual replacements 
keymap("n", "<C-h>", ":%s/<C-r><C-w>//gc<Left><Left><Left>", opts) 
keymap("v", "<C-h>", '"hy:%s/<C-r>h//gc<Left><Left><Left>', opts)`
```

***

#### **🔹 What’s Different?**

* **Adding `c` in `:%s/.../gc`**
  * This enables **interactive replacement mode**, so Vim will **prompt you** for each occurrence before replacing.

***

#### **🔹 How It Works**

8. **Move the cursor to a word** (or visually select a word).
9. **Press `<Leader>h>`** (or `<C-h>` if you prefer).
10. **Vim will highlight the first match** and prompt:

    `replace with (y/n/a/q/l/^E/^Y)?`

    * `y` → Replace this occurrence
    * `n` → Skip this occurrence
    * `a` → Replace **all occurrences** (without asking again)
    * `q` → Quit replacement
    * `l` → Replace this occurrence and **quit afterward**
    * `<Ctrl-E>` / `<Ctrl-Y>` → Scroll the screen while deciding

***
