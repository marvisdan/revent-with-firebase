import React, { Component } from "react";
import cuid from "cuid";
import { connect } from 'react-redux';
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import { createEvent, updateEvent, deleteEvent } from '../eventActions'
class EventDashboard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  };

  // arrow funx allow this
  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  // arrow funx allow this
  handleCancel = () => {
    this.setState({
      isOpen: false
    });
  };

  handleCreateEvent = newEvent => {
    const { createEvent } = this.props;
    newEvent.id = cuid();
    newEvent.PhotoURL = "/assets/user.png";
    createEvent(newEvent);
    this.setState({
      selectedEvent: null,
      isOpen: false
    });
  };

  handleOpenEvent = eventToOpen => () => {
    this.setState({
      selectedEvent: eventToOpen,
      isOpen: true
    });
  };
  
  handleUpdateEvent = updatedEvent => {
    const { updateEvent} = this.props;
      updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvents: null
    });
  };
  
  handleDeleteEvent = eventId => () => {
    const {deleteEvent} = this.props;
    deleteEvent(eventId);
  };

  render() {
    const { selectedEvent } = this.state;
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            deleteEvent={this.handleDeleteEvent}
            onEventOpen={this.handleOpenEvent}
            events={events}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Event"
          />
          {this.state.isOpen && (
            <EventForm
              updateEvent={this.handleUpdateEvent}
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              handleCancel={this.handleCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    events: state.events,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (event) => dispatch(createEvent(event)),
    updateEvent: (event) => dispatch(updateEvent(event)),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
