<template>
  <full-screen-clock></full-screen-clock>
  <FlipClock></FlipClock>
  <SearchInput />
  <favorites />
  <EventsOnHistory />
  <div id="he-plugin-standard"></div>
</template>

<script>

import SearchInput from './components/SearchInput.vue'
import Favorites from './components/Favorites.vue'
import FlipClock from './components/FlipClock.vue'
import FullScreenClock from './components/FullScreenClock.vue'
import EventsOnHistory from './components/EventsOnHistory.vue'

export default {
  name: 'App',
  components: {
    SearchInput,
    Favorites,
    FlipClock,
    FullScreenClock,
    EventsOnHistory
  }
}
</script>

<style >
</style>
