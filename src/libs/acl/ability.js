// Note: Role
import Vue from 'vue'
import { Ability } from '@casl/ability'
import commonData from '@/@db/common'
import { initialAbility } from './config'

//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
const userData = JSON.parse(localStorage.getItem('userData'))
const existingAbility = userData ? userData.ability : null

export const permission = (formCode, controlCode) => {
  const form = Vue.prototype.$ability.j.reverse().find(item => item.subject.toUpperCase() === formCode.toUpperCase() && item.controls.length > 0)

  if (form) {
    const control = form.controls.find(item => item.controlCode.toUpperCase() === controlCode.toUpperCase())

    if (control) {
      return {
        show: control.showStatus !== commonData.showStatus.invisible,
        disabled: control.showStatus === commonData.showStatus.disable,
      }
    }
  }

  return {
    show: false,
    disabled: true,
  }
}

export default new Ability(existingAbility || initialAbility)
