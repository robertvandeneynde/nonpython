#!/bin/sh

# interactive aliases to improve security
alias rm='rm --interactive' # unix -i
alias mv='mv --interactive' # unix -i
alias cp='cp --interactive' # unix -i

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

# some more ls aliases
alias ll='ls -lhgG' # -G = --no-group, -g = do not print user
alias la='ls -A'
alias lg='ls --group-directories-first'
alias l='ls -CF'
alias s='cd ..'
alias ss='cd ../..' # cannot use ss program, but I don't care
alias sss='cd ../../..'
alias less='less -S'
alias silent-background='$1 > /dev/null 2> /dev/null &'
alias background-silent='$1 > /dev/null 2> /dev/null &'
# function last-download below # alias last-download='ls -d /home/robert/downloads/* --sort=time | head -n 1'
alias move-last-download='mv --verbose "$(last-download)" .'
alias last-screenshot='ls -d /home/robert/pictures/screenshots/* --sort=time | head -n 1'
alias last-screenshots='ls -d /home/robert/pictures/screenshots/* --sort=time | head -n 10'
alias copy-last-screenshot='cp --verbose "$(last-screenshot)" .'
alias recordmydesktop-one-screen='recordmydesktop --width=1920 --height=1080'
alias recordmydesktop-second-screen='recordmydesktop -y 1080 --width=1920 --height=1080'
alias recordmydesktop-quarter-screen='recordmydesktop --width=960 --height=540'
alias recordmydesktop-mobile='recordmydesktop --width=540 --height=960'

alias amc=auto-multiple-choice

texsee() {
    pdflatex -interaction=nonstopmode "$1.tex" && okular "$1.pdf"
}

make-script() {
    touch "$1"
    echo "#!/bin/bash" >> "$1"
    echo >> "$1"
    chmod +x "$1"
    vim -c startinsert + "$1"
}

make-pyscript() {
    touch "$1"
    echo "#!/usr/bin/env python3" >> "$1"
    echo >> "$1"
    chmod +x "$1"
    vim -c startinsert + "$1"
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
    ls $(find $f -maxdepth 1 -type f -writable)
}

alias ls-readonly=lsreadonly
lsreadonly() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    ls $(find $f -maxdepth 1 -type f -perm 444)
}

alias ll-writable=llwritable
llwritable() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    ll $(find $f -maxdepth 1 -type f -writable)
}

alias ll-readonly=llreadonly
llreadonly() {
    if [ $# -eq 0 ]; then
        f="."
    else
        f="$@"
    fi
    ll $(find $f -maxdepth 1 -type f -perm 444)
}
