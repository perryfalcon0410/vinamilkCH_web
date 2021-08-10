<template>
  <p>{{ keyHash }}</p>
</template>

<script>
import sha256 from 'sha256'
// import { v1 as uuidv1 } from 'uuid'

export default {
  data() {
    return {
      keyHash: '',
    }
  },

  mounted() {
    // SET THE LICENSE INFO
    const licenceOwner = 'IMT Solutions'
    const licenceKey = 'BC7012D96BEB8D9DDA52AEB6E7F8D2039FD0F4EB'

    // DO NOT MODIFY THE FOLLOWING CODE
    const timestamp = new Date()
    console.log(timestamp)
    const licenceHash = sha256(licenceKey + timestamp)
    const output = `${licenceOwner}|${licenceHash}`
    this.keyHash = output
  },
}
</script>
