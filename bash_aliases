#!/bin/bash

# interactive aliases to improve security
alias rm='rm -i' # in recent version of bash, -i = --interactive
alias mv='mv -i' # in recent version of bash, -i = --interactive
alias cp='cp -i' # in recent version of bash, -i = --interactive

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto' # bad idea to add --group-directories-first for last-download, see "alias lg"
    alias dir='dir --color=auto'
    alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
else
    alias ls='ls' # bad idea to add --group-directories-first for last-download, see "alias lg"
fi

# some more ls/cd aliases
alias ll='ls -lhgG' # -G = --no-group, -g = do not print user
alias la='ls -A'
alias lg='ls --group-directories-first'
alias l='ls -CF'
alias s='cd ..'
alias ss='cd ../..' # cannot use ss program, but I don't care
alias sss='cd ../../..'

# typos
alias dc=cd
alias kaet=kate

# custom aliases
alias less='less -S'
alias silent-background='$1 > /dev/null 2> /dev/null &'
alias background-silent='$1 > /dev/null 2> /dev/null &'

# operations on just created files
# function last-download below # alias last-download='ls -d /home/robert/downloads/* --sort=time | head -n 1'
alias move-last-download='mv --verbose "$(last-download)" .'
alias last-screenshot='ls -d /home/robert/pictures/screenshots/* --sort=time | head -n 1'
alias last-screenshots='ls -d /home/robert/pictures/screenshots/* --sort=time | head -n 10'
alias copy-last-screenshot='cp --verbose "$(last-screenshot)" .'
alias last-webcam='ls -d /home/robert/Webcam/* --sort=time | head -n 1'

# recordmydesktop
alias recordmydesktop-one-screen='recordmydesktop --width=1920 --height=1080'
alias recordmydesktop-720='recordmydesktop --width=1280 --height=720'
alias recordmydesktop-second-screen='recordmydesktop -y 1080 --width=1920 --height=1080'
alias recordmydesktop-quarter-screen='recordmydesktop --width=960 --height=540'
alias recordmydesktop-mobile='recordmydesktop --width=540 --height=960'

# xclip macOS-like aliases
alias pbcopy='xclip -selection clipboard'
alias pbpaste='xclip -selection clipboard -o'

alias pyecho='python -c "import sys; print sys.argv[1:]"'

activatevenv() {
    if [ $# = 1 ]; then
        d="$1"
    elif [ $# = 0 ]; then
        if [ -d env ]; then
            d=env
        elif [ -d venv ]; then
            d=venv
        elif [ -d create ]; then
            d=create
        else
            echo "usage: activatevenv NAME"
        fi
    fi
    source "$d/bin/activate"
}

alias amc=auto-multiple-choice

texsee() {
    name="$1"
    
    name=$(python3 -c '
import sys, os
name = sys.argv[1]
if name.endswith((".tex", ".")):
    name = os.path.splitext(name)[0]
print(name)
    ' "$name")
    
    pdflatex -interaction=nonstopmode "$name.tex" && okular "$name.pdf"
}

make-script() {
    touch "$1"
    echo "#!/bin/bash" >> "$1"
    echo >> "$1"
    chmod +x "$1"
    vim -c startinsert + "$1"
}

make-pyscript() {
    name="$1"
    
    if [ -z "$name" ]; then
        echo "usage: make-pyscript NAME"
        return
    fi

    name=$(python3 -c '
import sys, os
name = sys.argv[1]
if not os.path.splitext(name)[1]:
    name += ".py"
print(name)
    ' "$name")

    touch "$name"
    echo "#!/usr/bin/env python3" >> "$name"
    echo >> "$name"
    chmod +x "$name"
    vim -c startinsert + "$name"
}

last-download() {
    if [ -z "$1" ]; then
        N=1
    else
        N="$1"
    fi
    ls -d /home/robert/downloads/* --sort=time | head -n "$N"
}

alias ls-writable=lswritable
lswritable() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    
    o=$(find $f -maxdepth 1 -type f -writable -printf '%P\n')
    
    if [ -n "$o" ]; then
        ls $o
    fi
}

alias ls-readonly=lsreadonly
lsreadonly() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    
    o=$(find $f -maxdepth 1 -type f -perm 444 -printf '%P\n')
    
    if [ -n "$o" ]; then
        ls $o
    fi
}

alias ll-writable=llwritable
llwritable() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    
    o=$(find $f -maxdepth 1 -type f -writable -printf '%P\n')
    
    if [ -n "$o" ]; then
        ll $o
    fi
}

alias ll-readonly=llreadonly
llreadonly() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    
    o=$(find $f -maxdepth 1 -type f -perm 444 -printf '%P\n')
    
    if [ -n "$o" ]; then
        ll $o
    fi
}

# modifies PS1 to be on two lines
alias ps1-long=long-ps1
long-ps1() {
    if [ -z "$OLD_PS1" ]; then
        export OLD_PS1="$PS1"
    fi
    
    NEW_PS1=$(python3 -c '
import sys
PS1 = sys.argv[1]
PS1 = "(" + PS1.rstrip().rstrip("$") + ")" + "\n$ "
print(PS1)
    ' "$PS1")

    # export PS1="$PS1\n> "
    export PS1="$NEW_PS1"
}

alias ps1-short=short-ps1
short-ps1() {
    if [ -z "$OLD_PS1" ]; then
        export OLD_PS1="$PS1"
    fi
    
    export PS1='\[\033[37;1m\]\A\[\033[00m\] [\[\033[01;34m\]\W\[\033[00m\]] $ '
    # export PS1='\A \W $ '
}

make_ps1_relative_to_project_dir() {
    NEW_PS1=$(python3 -c '
import sys
OLD_PS1, PWD, PROJECT_DIR = sys.argv[1:]

from pathlib import Path
PWD, PROJECT_DIR = map(Path, (PWD, PROJECT_DIR))

try:
    P = "[" + PROJECT_DIR.parts[-1] + "]" + "/" + str(PWD.relative_to(PROJECT_DIR))
except (ValueError, IndexError):
    P = str(PWD.absolute())

P = P.rstrip(".")

if P != "/":
    P = P.rstrip("/")

print(OLD_PS1.replace("\\w", P).replace("\\W", P))
    ' "$OLD_PS1" "$PWD" "$PROJECT_DIR")
    
    export PS1="$NEW_PS1"
}

alias project-ps1=ps1-project
ps1-project() {
    if [ -z "$OLD_PS1" ]; then
        export OLD_PS1="$PS1"
    fi
    
    export PROJECT_DIR="$PWD"
    
    if [ -z "$OLD_PROMPT_COMMAND" ]; then
        export OLD_PROMPT_COMMAND="$PROMPT_COMMAND"
        
        PROMPT_COMMAND=$(python3 -c '
import sys
PROMPT_COMMAND = sys.argv[1]
PROMPT_COMMAND = PROMPT_COMMAND.rstrip().rstrip(";")
print(PROMPT_COMMAND + "; make_ps1_relative_to_project_dir")
        ' "$PROMPT_COMMAND")
    fi
}


# call that after ps1-* have been called 
alias ps1-restore=restore-ps1
restore-ps1() {
    if ! [ -z "$OLD_PS1" ]; then
       PS1="$OLD_PS1"
       OLD_PS1=''
    fi
    
    if ! [ -z PROJECT_DIR ]; then
        PROJECT_DIR=''
        PROMPT_COMMAND="$OLD_PROMPT_COMMAND"
        OLD_PROMPT_COMMAND=''
    fi
}
