export default {
  methods: {
    BlockCls (Block, mods, utilityCls) {
      let cls = `${Block}`
      
      if (mods) {
        for (var mod of mods) {
          cls += ` ${Block}--${mod}`
        }
      }

      if (utilityCls) {
        let uCls = utilityCls.toString().replace(/,/g, ' ')
        cls += ' ' + uCls
      }

      return cls
    },

    ModCls: (Block, mod) => {
      return `${Block}--${mod}`
    },
    
    ElCls: (Block, el) => {
      return `${Block}__${el}`
    },

    ModSearch: (mods, needle) => {
      let ndl = needle ? needle : 'bg-'

      for (var mod of mods) {
        let found = mod.startsWith(ndl)

        if (found) {
          const ndlIndex = ndl.length
          return mod.substring(ndlIndex)
        }
      }

      return null
    }
  }
}