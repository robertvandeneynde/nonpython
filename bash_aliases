#!/bin/bash

# interactive aliases to improve security
alias rm='rm -i'  # in recent version of bash, -i = --interactive
alias mv='mv -i'  # in recent version of bash, -i = --interactive
alias cp='cp -i'  # in recent version of bash, -i = --interactive

# enable color support of ls and also add handy aliases
if [ -x /usr/bin/dircolors ]; then
    test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
    alias ls='ls --color=auto'  # bad idea to add --group-directories-first for last-download, see "alias lg"
    alias dir='dir --color=auto'
    alias vdir='vdir --color=auto'

    alias grep='grep --color=auto'
    alias fgrep='fgrep --color=auto'
    alias egrep='egrep --color=auto'
else
    : # alias ls='ls'  # bad idea to add --group-directories-first for last-download, see "alias lg"
fi

# some more ls/cd aliases
alias ll='ls -lhgG'  # -G = --no-group, -g = do not print user
alias la='ls -A'
alias lsg='ls --group-directories-first'
alias lg='l --group-directories-first'
alias llg='ll --group-directories-first'
alias lsd='ls -d */'  # show only directories
alias lgd='lsd'
alias l='ls -CF'
alias s='cd ..'
alias ss='cd ../..'  # if you want `/bin/ss`, write `/bin/ss`
alias sss='cd ../../..'
alias h=cd  # such that 'h' means 'cd $HOME'
alias c=cd  # because two letters are too much

# typos
alias dc=cd  # if you want dc calculator, use /usr/bin/dc
alias kaet=kate

# shortening useful commands
alias ff=firefox
alias k=kate

# tweaking of standard commands 
alias less='less -S'

# standard commands simple modification
alias hcat='tail -n +1'  # hcat FILES...
#wc-lines-sorted()
#alias wcls=wc-lines-sorted

# custom aliases
alias silent-background='$1 > /dev/null 2> /dev/null &'
alias background-silent='$1 > /dev/null 2> /dev/null &'
alias pyecho='python -c "import sys; from pprint import pprint; pprint(sys.argv[1:])"'

# operations on just created files
## last-* aliases are actually defined below as functions to take One parameter: n
#alias last-download='ls -d ~/downloads/* --sort=time | head -n 1'
alias move-last-download='mv --verbose "$(last-download)" .'
#alias last-screenshot='ls -d ~/pictures/screenshots/* --sort=time | head -n 1'
#alias last-screenshots='ls -d ~/pictures/screenshots/* --sort=time | head -n 10'
alias copy-last-screenshot='cp --verbose "$(last-screenshot)" .'
alias last-webcam='ls -d ~/Webcam/* --sort=time | head -n 1'

# recordmydesktop
alias recordmydesktop-one-screen='recordmydesktop --width=1920 --height=1080'
alias recordmydesktop-720='recordmydesktop --width=1280 --height=720'
alias recordmydesktop-second-screen='recordmydesktop -y 1080 --width=1920 --height=1080'
alias recordmydesktop-quarter-screen='recordmydesktop --width=960 --height=540'
alias recordmydesktop-mobile='recordmydesktop --width=540 --height=960'

# xclip macOS-like aliases
alias pbcopy='xclip -selection clipboard'
alias pbpaste='xclip -selection clipboard -o'

# misc.

#############
# functions #
#############

last-download() {
    if [ -z "$1" ]; then 
        N=1
    else
        N="$1"
    fi
    ls -d ~/downloads/* --sort=time | head -n "$N"
}

last-screenshot() {
    if [ -z "$1" ]; then
        N=1
    else
        N="$1"
    fi
    ls -d ~/screenshots/* --sort=time | head -n "$N"
}

last-screenshots() {
    if [ -z "$1" ]; then
        N=10
    else
        N="$1"
    fi
    ls -d ~/screenshots/* --sort=time | head -n "$N"
}

cut-last-screenshot() {
    if [ -z "$1" ]; then
        direction=keep-bottom
    else
        direction="$1"
    fi
    
    if [ -z "$2" ]; then
        percent=50
    else
        percent="$2"
    fi
    
    filename=$(last-screenshot)

    python3 -c '
import sys, os, subprocess, re, pathlib
from datetime import datetime, timedelta
from fractions import Fraction
direction, percent, filename = sys.argv[1:]

ratio = Fraction(percent) if re.match("\d+/\d+", percent) else int(percent)/100

fmt = str(pathlib.Path("~/screenshots/screenshot_%Y-%m-%d_%H:%M_%S.png").expanduser())
new_name = datetime.strftime(datetime.strptime(filename, fmt) + timedelta(seconds=1), fmt)

w,h = map(int, subprocess.check_output(["identify", filename], universal_newlines=True).split()[2].split("x"))
top = int(ratio * h)
bottom = h - top
left = int(ratio * w)
right = w - left

keep = (f"{w}x{top}+0+0" if direction == "keep_left" else
        f"{w}x{top}+0+0" if direction == "keep_top" else
        f"{w}x{bottom}+0+{top}" if direction == "keep_right" else
        f"{w}x{bottom}+0+{top}") # if direction == "keep_bottom" 

subprocess.run(["convert", filename, "-crop", keep, new_name])
print("Created", new_name)
    ' "$direction" "$percent" "$filename"
}
alias cut-last-screenshot-keep-bottom='cut-last-screenshot keep-bottom'
alias cut-last-screenshot-keep-top='cut-last-screenshot keep-top'
alias cut-last-screenshot-keep-left='cut-last-screenshot keep-left'
alias cut-last-screenshot-keep-right='cut-last-screenshot keep-right'

set-django-class-env() {
    export PS1='\n\[\033[37;1m\]\A\[\033[00m\] \[\033[01;34m\]\w\[\033[00m\]\n$ '
    export PYTHONDONTWRITEBYTECODE=yes
}

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
            echo "usage: activatevenv NAME (or have a 'env', 'venv' or 'create' directory in your current dir)"
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
    if [ -e "$1" ]; then
        echo "File exists"
        return
    fi
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
    
    if [ -e "$name" ]; then
        echo "File exists"
        return
    fi

    name=$(python3 -c '
import sys, os
name = sys.argv[1]
if not os.path.splitext(name)[1]:
    name += ".py"
print(name)
    ' "$name")

    echo '#!/usr/bin/env python3
import argparse
p = parser = argparse.ArgumentParser()
p.add_argument("file")
a = args = parser.parse_args()
' >> "$name"
    chmod +x "$name"
    vim -c startinsert + "$name"
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
PS1 = "\n(" + PS1.rstrip().rstrip("$").strip() + ")" + "\n$ "
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


swap(){
    if [ -e "$1" ] && [ -e "$2" ]; then
        temp=$(date +%s)
        if [ -e "$temp" ]; then
            echo "File with timestamp already exists: '$temp'"
            return
        fi
        mv "$1" "$temp"  # mv -f ?
        mv "$2" "$1"
        mv "$temp" "$2"
    else
        echo "Files must exist: '$1', '$2'"
    fi
}

upload-last-mp3() {
    f=$(ls -t *.mp3 | head -1)
    scp "$f" rob:mp3-transit
    echo "Uploaded '$f'"
}

vimcat() {
    vim "$1" && cat "$1"
}

wc-lines-sorted() {
    wc -l $@ | sort -h
}
alias wcls=wc-lines-sorted

streaming() {
     INRES="1920x1080"    # input resolution
     OUTRES="1920x1080"   # output resolution
     FPS="15"             # target FPS
     GOP="30"             # i-frame interval, should be double of FPS, 
     GOPMIN="15"          # min i-frame interval, should be equal to fps, 
     THREADS="2"          # max 6
     CBR="1000k"          # constant bitrate (should be between 1000k - 3000k)
     QUALITY="ultrafast"  # one of the many FFMPEG preset
     AUDIO_RATE="44100"   # audio rate
     SERVER="live-ams"    # twitch server, see http://bashtech.net/twitch/ingest.php to change 
     
     echo -n "StreamKey: "
     read -s STREAM_KEY
     
     ffmpeg -f x11grab -s "$INRES" -r "$FPS" -i :0.0 -f alsa -i pulse -f flv -ac 2 -ar $AUDIO_RATE \
       -vcodec libx264 -g $GOP -keyint_min $GOPMIN -b:v $CBR -minrate $CBR -maxrate $CBR -pix_fmt yuv420p\
       -s $OUTRES -preset $QUALITY -tune film -acodec libmp3lame -threads $THREADS -strict normal \
       -bufsize $CBR "rtmp://$SERVER.twitch.tv/app/$STREAM_KEY"
}
