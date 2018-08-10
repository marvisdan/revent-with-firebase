import React from "react";
import { connect } from "react-redux";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedSidebar from "./EventDetailedSidebar";
import EventDetailedChat from "./EventDetailedChat";
import { Grid } from "semantic-ui-react";

const EventDetailedPage = ({ events, match }) => {
  const eventId = match.params.id;
  let i = null;
  if (eventId && events.length) {
    i = events.findIndex(ev => ev.id === eventId)
    
  }
  let event = events[i];
  return (    
    <Grid>
      <Grid.Column width={10}>
        <EventDetailedHeader event={event} />
        <EventDetailedInfo event={event} />
        <EventDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventDetailedSidebar attendees={event.attendees} />
      </Grid.Column>
    </Grid>
  );
};
const mapStateToProps = state => {
  return {
    events: state.events
  };
};

export default connect(
  mapStateToProps,
  null
)(EventDetailedPage);
