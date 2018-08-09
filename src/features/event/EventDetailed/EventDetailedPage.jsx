import React from 'react';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedSidebar from './EventDetailedSidebar';
import EventDetailedChat from './EventDetailedChat';
import { Grid } from 'semantic-ui-react';

const EventDetailedPage = () => {
  return (
    <Grid>
    <Grid.Column width={10}>
      <EventDetailedHeader />
      <EventDetailedInfo />
      <EventDetailedChat />
    </Grid.Column>
    <Grid.Column width={6}>
      <EventDetailedSidebar />
    </Grid.Column>
    </Grid>
  );
}

export default EventDetailedPage;
