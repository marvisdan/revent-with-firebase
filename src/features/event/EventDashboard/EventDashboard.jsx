import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { deleteEvent } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";

class EventDashboard extends Component {
  handleDeleteEvent = eventId => () => {
    const { deleteEvent } = this.props;
    deleteEvent(eventId);
  };

  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList deleteEvent={this.handleDeleteEvent} events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.events,
    loading: state.async.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteEvent: id => dispatch(deleteEvent(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
