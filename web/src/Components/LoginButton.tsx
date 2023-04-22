export default function LoginButton({serviceName}) {
    const getURL = () => {
        if (serviceName === "spotify") {
            const url = new URL('https://accounts.spotify.com/authorize');
            const scopes = ["user-read-private", "user-read-email", "user-read-currently-playing", "user-modify-playback-state"]
            url.searchParams.append('scope', scopes.join(' '))
            url.searchParams.append('access_type', 'offline')
            url.searchParams.append('response_type', 'code')
            url.searchParams.append('redirect_uri', 'http://localhost:8081/authSpot')
            url.searchParams.append('client_id', "024109e93523411eab1259b128096e05")
            return url
        } else if (serviceName === "googledrive" || serviceName === "gmail" || serviceName === "googlecalendar") {
            const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
            const scopes = ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile", "openid", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/gmail.modify", "https://www.googleapis.com/auth/gmail.labels", "https://www.googleapis.com/auth/gmail.settings.basic", "https://mail.google.com/", "https://www.googleapis.com/auth/calendar"]
            url.searchParams.append('scope', scopes.join(' '))
            url.searchParams.append('access_type', 'offline')
            url.searchParams.append('response_type', 'code')
            url.searchParams.append('redirect_uri', 'http://localhost:8081/auth')
            url.searchParams.append('client_id', "569424510679-e4m5sdncrq8prplcgdbctlfc222r1t5f.apps.googleusercontent.com")
            return url
        } else if (serviceName === "github") {
            const url = new URL('https://github.com/login/oauth/authorize')
            const scopes = ["repo", "repo:status", "project"]
            url.searchParams.append('scope', scopes.join(' '))
            url.searchParams.append('access_type', 'offline')
            url.searchParams.append('response_type', 'code')
            url.searchParams.append('redirect_uri', 'http://localhost:8081/githubAuth')
            url.searchParams.append('client_id', "45be36432a6ad8f20160")
            return url
        } else if (serviceName === "slack") {
            const url = new URL('https://slack.com/oauth/authorize')
            const scopes = ["admin", "admin.usergroups:read", "users:read"] //,"pages_manage_posts", "pages_messaging", "pages_read_user_content", "pages_show_list", "public_profile", "publish_to_groups", "user_likes", "user_likes"]
            url.searchParams.append('scope', scopes.join(' '))
            url.searchParams.append('access_type', 'offline')
            url.searchParams.append('response_type', 'code')
            url.searchParams.append('redirect_uri', 'https://localhost:8081/authslack')
            url.searchParams.append('client_id', "4768703766130.4754226108183")
            return url
        } else { // Outlook
            const url = new URL('https://login.microsoftonline.com/common/oauth2/v2.0/authorize')
            const scopes = ["Mail.Read", "Mail.Send", "Mail.ReadWrite", "Chat.ReadWrite", "Files.ReadWrite.All"]
            url.searchParams.append('scope', scopes.join(' '))
            url.searchParams.append('access_type', 'offline')
            url.searchParams.append('response_type', 'code')
            url.searchParams.append('redirect_uri', 'http://localhost:8081/outlookauth')
            url.searchParams.append('client_id', "978020c9-d437-4004-bbc7-b4f41d309bc5")
            return url
        }
    }

    const handleTwitchLogin = () => {
        fetch('http://localhost:8080/auth/twitch', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
    }

    if (serviceName !== "twitch") {
        return (
            <div className='button' onClick={() => window.location.href = getURL().href}>
                <h2 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '34px'}}>Login</h2>
            </div>
        )
    } else {
        return (
            <div className='button' onClick={() => handleTwitchLogin()}>
                <h2 style={{color: '#D3DCFF', fontFamily: 'Amoreiza', fontSize: '34px'}}>Login</h2>
            </div>
        )
    }
}