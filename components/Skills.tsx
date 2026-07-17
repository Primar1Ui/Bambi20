'use client';

import { motion } from 'framer-motion';
import { skills } from '@/lib/data';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Skills() {
  const reduce = usePrefersReducedMotion();

  const skillCategories = [
    { title: 'Frontend', skills: skills.frontend, color: 'from-blue-500 to-cyan-500' },
    { title: 'Backend', skills: skills.backend, color: 'from-purple-500 to-pink-500' },
    { title: 'Tools', skills: skills.tools, color: 'from-cyan-500 to-blue-500' },
    { title: 'Automation', skills: skills.automation, color: 'from-emerald-400 to-cyan-500' },
    { title: 'Deployment', skills: skills.deployment, color: 'from-pink-500 to-purple-500' },
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: reduce ? 0 : categoryIndex * 0.1,
                duration: reduce ? 0 : 0.4,
              }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-4 text-white">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={typeof skill === 'string' ? skill : skill.name} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium">
                        {typeof skill === 'string' ? skill : skill.name}
                      </span>
                      {typeof skill === 'object' && 'level' in skill && (
                        <span className="text-gray-500">{skill.level}%</span>
                      )}
                    </div>
                    <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{
                          width:
                            typeof skill === 'object' && 'level' in skill
                              ? `${skill.level}%`
                              : '100%',
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: reduce ? 0 : 0.6,
                          delay: reduce ? 0 : categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

