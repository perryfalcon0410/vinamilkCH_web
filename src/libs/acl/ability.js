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
  const form = Vue.prototype.$ability.j.reverse().find(item => item.subject === formCode)

  if (form) {
    const control = form.controls.find(item => item.controlCode === controlCode)

    if (control) {
      return {
        showStatus: control.showStatus,
      }
    }
  }

  return {
    showStatus: commonData.showStatus.invisible,
  }
}

export default new Ability(existingAbility || initialAbility)
