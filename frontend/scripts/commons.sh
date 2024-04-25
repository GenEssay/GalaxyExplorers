### Ansi Color

# Reset
Color_Off='\033[0m'       # Text Reset

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White

# Bold
BBlack='\033[1;30m'       # Black
BRed='\033[1;31m'         # Red
BGreen='\033[1;32m'       # Green
BYellow='\033[1;33m'      # Yellow
BBlue='\033[1;34m'        # Blue
BPurple='\033[1;35m'      # Purple
BCyan='\033[1;36m'        # Cyan
BWhite='\033[1;37m'       # White

# Underline
UBlack='\033[4;30m'       # Black
URed='\033[4;31m'         # Red
UGreen='\033[4;32m'       # Green
UYellow='\033[4;33m'      # Yellow
UBlue='\033[4;34m'        # Blue
UPurple='\033[4;35m'      # Purple
UCyan='\033[4;36m'        # Cyan
UWhite='\033[4;37m'       # White

# Background
On_Black='\033[40m'       # Black
On_Red='\033[41m'         # Red
On_Green='\033[42m'       # Green
On_Yellow='\033[43m'      # Yellow
On_Blue='\033[44m'        # Blue
On_Purple='\033[45m'      # Purple
On_Cyan='\033[46m'        # Cyan
On_White='\033[47m'       # White

# High Intensity
IBlack='\033[0;90m'       # Black
IRed='\033[0;91m'         # Red
IGreen='\033[0;92m'       # Green
IYellow='\033[0;93m'      # Yellow
IBlue='\033[0;94m'        # Blue
IPurple='\033[0;95m'      # Purple
ICyan='\033[0;96m'        # Cyan
IWhite='\033[0;97m'       # White

# Bold High Intensity
BIBlack='\033[1;90m'      # Black
BIRed='\033[1;91m'        # Red
BIGreen='\033[1;92m'      # Green
BIYellow='\033[1;93m'     # Yellow
BIBlue='\033[1;94m'       # Blue
BIPurple='\033[1;95m'     # Purple
BICyan='\033[1;96m'       # Cyan
BIWhite='\033[1;97m'      # White

# High Intensity backgrounds
On_IBlack='\033[0;100m'   # Black
On_IRed='\033[0;101m'     # Red
On_IGreen='\033[0;102m'   # Green
On_IYellow='\033[0;103m'  # Yellow
On_IBlue='\033[0;104m'    # Blue
On_IPurple='\033[0;105m'  # Purple
On_ICyan='\033[0;106m'    # Cyan
On_IWhite='\033[0;107m'   # White

### functions

# 函数：将键值对添加或编辑到指定的 .env 文件中
# 如果值不存在，则删除该键
# 如果文件不存在，则创建该文件并添加键值对
# 参数1：要添加或编辑的键
# 参数2：要添加或编辑的值
# 参数3：要添加或编辑的 .env 文件路径
function set_dotenv() {
  local key="$1"
  local value="$2"
  local dotenv="$3"

  # 如果文件不存在，则创建该文件
  if [ ! -f "$dotenv" ]; then
    touch "$dotenv"
  fi

  if [ -z "$value" ]; then
    # 如果值为空，则删除该键
    replace_in_file "/^$key=/d" "$dotenv"
  else
    # 如果值不为空，则添加或编辑该键
    if grep -q "^$key=" "$dotenv"; then
      local value_escaped=$(echo "$value" | sed 's/\//\\\//g')
      replace_in_file "s/^$key=.*/$key=$value_escaped/" "$dotenv"
      unset value_escaped
    else
      echo -e "\n$key=$value" >> "$dotenv"
    fi
  fi
}

function load_dotenv() {
  local dotenv="${1:-.env}"
  if [ -f "$dotenv" ]; then
    source $dotenv
  fi
}

