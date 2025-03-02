---
publishDate: 2025-03-01T00:00:00Z
updateDate: 2025-03-02T00:00:00Z
title: Compiling Pixlie AI 0.1.2 on MacOS
excerpt: Fix compilation errors on MacOS after recent dependency updates.
# image: https://pixlie.com/images/blog/pixlie-screenshot-search-results.png
metadata:
  title: Compiling Pixlie AI 0.1.2 on MacOS
  description: Fix compilation errors on MacOS after recent dependency updates.
---

The latest updates in our dependencies causes the compilation of [Pixlie AI](https://github.com/pixlie/PixlieAI) on MacOS to break,
since it is not able to get access to some of the system dependencies.

To fix these issues, you need to take the following steps:
1. Install `llvm` using [Homebrew](https://brew.sh/), by running:
    ```shell
    brew install llvm
    ```
2. Add the following lines at the bottom of the file `~/.zshrc`:
    ```shell
    export LIBCLANG_PATH=$(brew --prefix llvm)/lib
    export DYLD_LIBRARY_PATH="$LIBCLANG_PATH:$DYLD_LIBRARY_PATH"
    export PATH=$(brew --prefix llvm)/bin:$PATH

    export CC=$(brew --prefix llvm)/bin/clang
    export CXX=$(brew --prefix llvm)/bin/clang++
    ```
    To quickly open the file using TextEdit from your terminal, you can run:
    ```shell
    open -a "TextEdit" ~/.zshrc
    ```
3. Open a new terminal or reload the environment:
    ```shell
    omz reload
    ```
4. Now try to run Pixlie AI while you're in the `pixlie_ai` folder:
    ```shell
    cargo run --bin cli
    ```

---
_Update: 2 Mar, 2025_

Some people have reported that the above steps are not enough and it still throws the error ``linking with `cc` failed``.

If you're facing this error after making the above changes, please make sure you are using a fresh/reloaded terminal environment and take the following steps:

1. Install `rocksdb`:
    ```shell
    brew install rocksdb
    ```
2. Add the following lines at the bottom of the file `~/.zshrc`:
    ```shell
    export ROCKSDB_INCLUDE_DIR=$(brew --prefix rocksdb)/include
    export ROCKSDB_LIB_DIR=$(brew --prefix rocksdb)/lib
    ```
3. Open a new terminal or reload the environment and try running Pixlie AI again.
---

If you still face any issues with compiling Pixlie AI, please do not hesitate to [contact us](https://pixlie.com/contact). We would love to hear from you – issue or no issue.

---

Pixlie is open source. And while we are still in the early phases, we will be finalizing this piece of the puzzle in the coming weeks. [Try it out for your self](https://github.com/pixlie/PixlieAI) and see what PixlieAI can do. 

Or [contribute to PixlieAI](https://github.com/pixlie/PixlieAI) and be part of something different. 