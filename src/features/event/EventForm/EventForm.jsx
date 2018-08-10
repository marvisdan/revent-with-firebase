import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from 'cuid';
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../eventActions";

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.eventObject)
  };

  onFormSubmit = evt => {
    const { createEvent, updateEvent, history} = this.props;
    evt.preventDefault();
    if (this.state.event.id) {
      updateEvent(this.state.event);
      history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: '/assets/user.png'
      }
      createEvent(newEvent);
      history.push('/events')
    }
  };

  onInputChange = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };

  render() {
    const { history } = this.props;
    const { event } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={event.title}
              onChange={this.onInputChange}
              placeholder="Event Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              value={event.date}
              onChange={this.onInputChange}
              type="date"
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={event.city}
              onChange={this.onInputChange}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={event.venue}
              onChange={this.onInputChange}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={event.hostedBy}
              onChange={this.onInputChange}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={history.goBack} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };
  let i;
  if (eventId && state.events.length) {
    i = state.events.findIndex(event => event.id === eventId);
  }
  let eventObject = state.events[i];
  return {
    eventObject
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createEvent: event => dispatch(createEvent(event)),
    updateEvent: event => dispatch(updateEvent(event))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);
