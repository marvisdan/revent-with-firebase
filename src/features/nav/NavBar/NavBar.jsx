import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase';
import { Menu, Container, Button } from 'semantic-ui-react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import { openModal } from '../../modals/modalActions';

const actions = {
  openModal,
}
class NavBar extends Component {

  handleSignIn = () => {
  this.props.openModal('LoginModal')
  }

  handleRegister= () => {
    this.props.openModal('RegisterModal')
  }
  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to="/" header>
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/test" name="Test" />
          {authenticated &&
            <Menu.Item as={NavLink} to="/people" name="People" />
          }
          {authenticated &&
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                positive
                inverted
                content="Create Event"
              />
            </Menu.Item>
          }
          {authenticated
            ? (<SignedInMenu signOut={this.handleSignOut} auth={auth} />)
            : (<SignedOutMenu signIn={this.handleSignIn}  register={this.handleRegister} />)
          }
        </Container>
      </Menu>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    currentUser: state.auth.currentUser,
    authenticated: state.auth.authenticated,
  }
}
const mapDisptachToProps = (dispatch) => {
  return {
    openModal: () => dispatch(openModal()),
  }
}
export default withRouter(withFirebase(connect(mapStateToProps, actions)(NavBar)));