#!/bin/bash
# ~/.bashrc: executed by bash(1) for non-login shells.
# see /usr/share/doc/bash/examples/startup-files (in the package bash-doc)
# for examples

# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

# don't put duplicate lines or lines starting with space in the history.
# See bash(1) for more options
HISTCONTROL=ignoreboth

# append to the history file, don't overwrite it
shopt -s histappend

# for setting history length see HISTSIZE and HISTFILESIZE in bash(1)
HISTSIZE=1000
HISTFILESIZE=10000

# before each command, write to ~/.bash_history
PROMPT_COMMAND="history -a;$PROMPT_COMMAND"

# multi-line commands should be stored as a single command
shopt -s cmdhist

# check the window size after each command and, if necessary,
# update the values of LINES and COLUMNS.
shopt -s checkwinsize

# If set, the pattern "**" used in a pathname expansion context will
# match all files and zero or more directories and subdirectories.
#shopt -s globstar

# make less more friendly for non-text input files, see lesspipe(1)
[ -x /usr/bin/lesspipe ] && eval "$(SHELL=/bin/sh lesspipe)"

# set variable identifying the chroot you work in (used in the prompt below)
if [ -z "${debian_chroot:-}" ] && [ -r /etc/debian_chroot ]; then
    debian_chroot=$(cat /etc/debian_chroot)
fi

# set a fancy prompt (non-color, unless we know we "want" color)
case "$TERM" in
    xterm-color) color_prompt=yes;;
esac

# uncomment for a colored prompt, if the terminal has the capability; turned
# off by default to not distract the user: the focus in a terminal window
# should be on the output of commands, not on the prompt
force_color_prompt=yes

if [ -n "$force_color_prompt" ]; then
    if [ -x /usr/bin/tput ] && tput setaf 1 >&/dev/null; then
	# We have color support; assume it's compliant with Ecma-48
	# (ISO/IEC-6429). (Lack of such support is extremely rare, and such
	# a case would tend to support setf rather than setaf.)
	color_prompt=yes
    else
	color_prompt=
    fi
fi

if [ "$color_prompt" = yes ]; then
    # PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
    # PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
    # PS1='\[\033[37;1m\]\A\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\] $ '
    PS1='\[\033[37;1m\]\A\[\033[00m\] \[\033[01;34m\]\w/\[\033[00m\] '
    # PS1='\[\033[37;1m\]\A\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\] ; '  # useful for copy paste!
else
    # PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
    # PS1='${debian_chroot:+($debian_chroot)}\u:\w\$ $ '
    # PS1='\A \w\ $ '
    PS1='\A \w/ '
    # PS1='\A \w\ ; '  # useful for copy paste!
fi
unset color_prompt force_color_prompt

# If this is an xterm set the title to user@host:dir
case "$TERM" in
xterm*|rxvt*)
    PS1="\[\e]0;${debian_chroot:+($debian_chroot)}\u@\h: \w\a\]$PS1"
    ;;
*)
    ;;
esac

if [ -f ~/.bash_aliases ]; then
    . ~/.bash_aliases
fi

# enable programmable completion features (you don't need to enable
# this, if it's already enabled in /etc/bash.bashrc and /etc/profile
# sources /etc/bash.bashrc).
if ! shopt -oq posix; then
  if [ -f /usr/share/bash-completion/bash_completion ]; then
    . /usr/share/bash-completion/bash_completion
  elif [ -f /etc/bash_completion ]; then
    . /etc/bash_completion
  fi
fi

# I don't want the line continuation prompt ">'
PS2=''

export PYTHONSTARTUP="$HOME/python/pystartup.py"
export PYTHONPATH="$HOME/python/"

export EDITOR=vim
export LANGUAGE='en_US.UTF-8' # 'en_US.UTF-8 git'
export LANG='en_US.UTF-8'

export PATH="$PATH:/usr/local/android-sdk-linux/"
export PATH="$PATH:/usr/local/android-sdk-linux/tools"
export PATH="$PATH:/usr/local/android-sdk-linux/platform-tools"
export PATH="$PATH:/usr/local/android-sdk-linux/build-tools"

# own directories in PATH
export PATH="$PATH:$HOME/python"
export PATH="$PATH:$HOME/python/amc_utils"
export PATH="$PATH:$HOME/nonpython"
export PATH="$PATH:$HOME/bash"
export PATH="$PATH:$HOME/perl"

export PATH="$PATH:$HOME/.local/bin"

#WORKON_HOME=$HOME/.virtualenvs
#source /usr/local/bin/virtualenvwrapper.sh 

#setup multiple keyboards
echo "use 'keyboards' command to setup BE-RU setup"
#keyboards

#THIS MUST BE AT THE END OF THE FILE FOR SDKMAN TO WORK!!!
export SDKMAN_DIR="/home/robert/.sdkman"
[[ -s "/home/robert/.sdkman/bin/sdkman-init.sh" ]] && source "/home/robert/.sdkman/bin/sdkman-init.sh"

robve=robertvandeneynde.be
