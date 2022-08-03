# Setup to run multiple accounts and connections over openSSH in windows

> Global git config | .gitconfig
> located at: ~/.gitconfig

```.gitconfig
[core]
	editor = \"C:\\Users\\%USERPROFILE%\\AppData\\Local\\Programs\\Microsoft VS Code\\bin\\code\" --wait
	sshCommand = ssh -i ~/.ssh/id_rsa
[user]
	name = name
	email = email

[includeIf "gitdir:C:/dev/private/"]
	path = C:/dev/private/.gitconfig-private
```

> Private git config | .gitconfig-private
```.gitconfig
[core]
	editor = \"C:\\Users\\%USERPROFILE%\\AppData\\Local\\Programs\\Microsoft VS Code\\bin\\code\" --wait
	sshCommand = ssh -i ~/.ssh/id_rsa
[user]
	name = name
	email = email
```

> You need to replace the %USERPROFILE% with your windows user account name, to do that 'win + r' and then run %appdata% and your username will be the next work in the route 'C:\Users\username'