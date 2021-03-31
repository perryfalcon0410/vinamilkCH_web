import mock from './mock'

/* eslint-disable import/extensions */

// JWT
import './jwt'

// dashboard
import './data/dashboard/analytics'
import './data/dashboard/ecommerce'

/* eslint-enable import/extensions */

mock.onAny().passThrough() // forwards the matched request over network
