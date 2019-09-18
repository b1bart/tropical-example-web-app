import React from 'react'
import { UALContext } from 'ual-reactjs-renderer'
import './UserInfo.scss'

import UserDropdown from 'components/navigation/UserDropdown'
import downArrow from 'assets/images/down-arrow.svg'
import upArrow from 'assets/images/up-arrow.svg'
import { onKeyUpEnter } from 'utils/keyPress'

class UserInfo extends React.Component {
  static contextType = UALContext

  _isMounted = false

  state = {
    showDropdown: false,
    accountName: '',
  }

  async componentDidMount() {
    this._isMounted = true
    const { activeUser } = this.context
    if (activeUser) {
      const accountName = await activeUser.getAccountName()
      if (this._isMounted) {
        this.setState({ accountName })
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  toggleDropdown = () => {
    this.setState(prevState => ({
      showDropdown: !prevState.showDropdown,
    }))
  }

  renderLogout = ( enroll ) => (
    <React.Fragment>
      <div
        className='user-info-dropdown-btn'
        tabIndex={0}
        role='button'
        onClick={this.toggleDropdown}
        onKeyUp={event => onKeyUpEnter(event, this.toggleDropdown)}
      >
        <img src={this.state.showDropdown ? upArrow : downArrow} alt='dropdown' />
      </div>
      { this.state.showDropdown && this.renderDropdown( enroll ) }
    </React.Fragment>
  )

  renderDropdown = ( enroll ) => {
    const { logout } = this.context
    return (
      <div className='user-info-dropdown-content'>
        <UserDropdown logout={logout} enroll={enroll} />
      </div>
    )
  }

  render() {
    const { logout, isAutoLogin } = this.context
    const { accountName } = this.state
    const { enroll } = this.props;
    const shouldDisplayLogout = logout && !isAutoLogin
    return (
      <div className={`user-info-container ${shouldDisplayLogout ? '' : 'user-info-hide-dropdown'}`}>
        <span className='user-info-prefix'> Signed in as </span>
        <div className='user-info-name'>{accountName}</div>
        { shouldDisplayLogout && this.renderLogout(enroll) }
      </div>
    )
  }
}

export default UserInfo
