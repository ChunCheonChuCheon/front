import React from 'react'
import { motion } from 'framer-motion';


const AnimationWrapper = ({ children, onExitComplete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 70,}}
            onAnimationComplete={onExitComplete}>
            {children}
        </motion.div>
    )
}

export default AnimationWrapper
