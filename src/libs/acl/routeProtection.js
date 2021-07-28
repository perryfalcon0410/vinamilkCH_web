// Note: Role
import ability from './ability'

export const canNavigate = to => to.matched.some(route => ability.can(route.meta.action || 'read', route.meta.resource ? route.meta.resource.toUpperCase() : route.meta.resource))

export const _ = undefined
