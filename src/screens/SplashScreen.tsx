import { motion } from 'framer-motion';

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-primary flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center"
      >
        <img 
          src="https://c.animaapp.com/mkfu2m19DTULFK/img/ai_1.png" 
          alt="Abbott splash gradient background"
          className="w-full h-screen object-cover absolute inset-0"
          loading="eager"
        />
        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-h1 font-sans font-semibold text-white mb-4">
              Abbott Flu Vaccine
            </h1>
            <p className="text-body text-white/90">Đang tải...</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
