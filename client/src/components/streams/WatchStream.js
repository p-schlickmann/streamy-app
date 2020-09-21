import React, {useEffect} from 'react'
import {useCookies} from 'react-cookie'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import StreamShow from './StreamShow'
import {signInWithToken, getStream} from '../../actions/actions'

const WatchStream = ({userInfo, signInWithToken, getStream, stream, match}) => {
    const [cookies, setCookies] = useCookies(['token'])
    console.log(stream)
    useEffect(()=> {
        getStream(match.params.userName)
    }, [])

    const onEnd = () => {

    }

    const onEdit = () => {

    }

    const onFollow = () => {

    }

    const onSubscribe = () => {

    }

    const renderContent = () => {
        if (!cookies.token) {
            return (
                <div>
                    <StreamShow />
                    <button onClick={<Redirect to ='/login'/>}>Subscribe</button>
                    <button onClick={<Redirect to ='/login'/>}>Follow</button>
                </div>
            )
        } else {
            if (!userInfo) {
                signInWithToken(cookies.token)
            } else {
                if (userInfo.username === match.params.userName && !stream) {
                    return (
                        <Redirect to='/streams/new' />
                    )
                } if (stream) {
                    if (userInfo.id===stream.user) {
                        return (
                            <div>
                                <StreamShow />
                                <button onClick={onEdit}>Edit Stream</button>
                                <button onClick={onEnd}>End Stream</button>
                            </div>    
                        )
                    } else {
                        return (
                            <div>
                                <StreamShow />
                                <button onClick={onSubscribe}>Subscribe</button>
                                <button onClick={onFollow}>Follow</button>
                            </div>    
                        )
                    }
                } else {
                    return <div>Stream not found</div>
                }
            }
        }
    }
    return(
        <div>
            {renderContent()}
        </div>

    )

}

const mapStateToProps = state => {
    console.log(state)
    return {userInfo: state.auth.userInfo, stream: state.streams[0]}
}

export default connect(mapStateToProps, {signInWithToken, getStream})(WatchStream)
