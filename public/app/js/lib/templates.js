define({help:"<pre>                                                                \nChat-App, encrypted instant chat.                                      \n                                                                       \n----------------------------------------------------------------------\t\n                                                                       \nClient:                                                    \t\t\t\n\t/key\t\tStrongPassphrase\tSets encryption key                 \n\t/nick\t\tNickName\t\tSets an optional nick                   \n\t/mute  \t\t\t\t\tAudio on\t\t\t\t\t\t\t\t\t\n\t/unmute  \t\t\t\tAudio off\t\t\t\t\t\t\t\t\t\n\t/clear\t\t\t\t\tClear on-screen buffer                      \n\t/help\t\t\t\t\tThis                                        \n\t/title\t\t\t\t\tSet your local page title\t\t\t\t\t\n\t/torch\t\tAfterSeconds\t\tConsole messages are torched  \t\t\n\t\t\t\t\t\tafter this amount of seconds \t\t\t\t\t\n\t\t\t\t\t\t(default 600).\t\t\t\t\t\t\t\t\t\n                                                                       \nRoom:                                                    \t\t\t\t\n\t/join\t\tRoomId\t\t\tJoin a room\t                            \n\t/leave\t\t\t\t\tLeave the room                              \n\t/count\t\t\t\t\tCount participants                          \n                                                                       \nHost:  \t\t                                                    \t\n\t/hosts\t\t\t\t\tList available hosts                   \t\t\n\t/connect\tHostIndex\t\tConnect to selected host               \t\n\t/disconnect\t\t\t\tDisconnect from host    \t\t\t        \n                                                                       \nYou can select any of the five last commands/messages with up/down key.\n                                                                       \nDue to security reasons, /key command is not saved, and command        \nhistory is  automatically cleared after one minute of inactivity.      \n                                                                       \n<strong>It is highly recommended to use incognito mode while chatting, \nto prevent browsers from keeping history or cache.</strong>            \n                                                                       \n----------------------------------------------------------------------\t\n</pre>",default_nick:"Anonymous",post:{motd:'<li id="{id}"><i class="motd">{text}</i></li>',info:'<li id="{id}"><i class="timestamp">[{timestamp}] </i>INF&gt; <i class="info">{text}</i></li>',server:'<li id="{id}"><i class="timestamp">[{timestamp}] </i>SRV&gt; <i class="server">{text}</i></li>',error:'<li id="{id}"><i class="timestamp">[{timestamp}] </i>ERR&gt; <i class="error">{text}</i></li>',message:'<li id="{id}"><i class="timestamp">[{timestamp}] </i>MSG&gt; <i class="nick">{nick}&gt;</i> <i class="message">{text}</i></li>'},messages:{key_to_short:"Hmm, that's a weak key, try again...",key_to_long:"Man that's a long key. Make it a tad short, 'kay?",key_ok:"Key set, you can now start communicating.",key_no_host:"You have to connect to a host before setting the key.",join_no_host:"You have to connect to a host before joining a room.",nick_to_short:"Nickname is too short, it has to be at least {nick_minLen} characters long. Try again.",nick_to_long:"Nickname is too long, it can be at most {nick_maxLen} characters long. Try again.",nick_set:"From now on, you're referred to as '{nick}'.",msg_no_room:"You have to join a room before sending messages. See /help.",not_in_room:"You have to be in a room to count participants...",msg_no_key:"You have to set an encryption key before sending a message. See /help.",leave_from_nowhere:"How are you supposed to leave, while being nowhere?",torch_is_now:"Messages are now torched after {ttl} seconds.",torch_not_set:"Invalid torch delay entered, nothing changed. See /help.",title_set:"The title of this window is now '{title}'.",muted:"Notifications and sounds are now muted.",unmuted:"Notifications and sounds are now on.",unrecognized_command:'Unrecognized command: "{commandName}"',room_name_too_long:"Isn't that a bit long?",room_name_too_short:"Nah, too short.",joined_room:"Joined room {roomName}.",left_room:"Left room {roomName}.",already_in_room:"You are already in a room ({room}), stoopid.",unable_to_decrypt:"Unabled to decrypt received message, keys does not match.",socket_error:"A network error has occurred. A restart may be required to bring back full functionality.<br>Examine the logs for more details.",connecting:"Connecting to host {host}...",connected:"A connection to the server has been established. Happy chatting!",disconnected:"Disconnected from host {host}.",already_connected:"You have to disconnect from {host} before joining another.",reconnect_no_host:"There is no host to reconnect with.",host_available:'<span class="info">{index}</span>\t<span class="good">[AVAILABLE]</span>\t<span class="neutral">{name}</span>\n',host_unavailable:'<span class="info">{index}</span>\t<span class="bad">[UNAVAILABLE]</span>\t<span class="neutral">{name}</span>\n'},server:{person_joined:"A person joined this room.",person_left:"A person left this room.",person_count:"There is {payload} person(s) in this room, including you.",command_failed:"Server command failed, you're probably trying to du something bogus.",bogus:"Received a bogus message from server."},client:{title:"Chat-App - Offline"}});