<script setup lang="ts">
import Header from '@/components/HeaderHero.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="my-container">
    <Header />

    <div class="border-dashed border-4" style="background-color: #f1f5f9; border-color: #18181b;"></div>
    
    <section class="bg-slate-100 py-8">
      <div class="container mx-auto">
        <h2>
          <span class="bg-sky-100 text-sky-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-lg">Extraction</span>
        </h2>
        <p class="p-4">
          Break down existing data into clean, iterable chunks. 
          By harnessing our streamlined approach, you’ll uncover valuable insights hidden within even the most complex data sets, paving the way for sharper decision-making and accelerated growth.
        </p>
        <h2>
          <span class="bg-yellow-100 text-yellow-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-lg">Enumeration</span>
        </h2>
        <p class="p-4">
          Seamlessly process each chunk, transforming input to output. 
          With our advanced enumeration techniques, you’ll convert raw data into actionable intelligence, ensuring a smooth, organized workflow that takes you from big-picture vision to tangible results.
        </p>
        <h2>
          <span class="bg-violet-100 text-violet-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-lg">Explore</span>
        </h2>
        <p class="p-4">
          Rapidly crawl and gather further insights from the Web. Stay ahead of emerging trends, outmaneuver competitors, and tap into real-time market shifts. 
          Our robust exploration capabilities put you at the forefront of industry intelligence, fueling your innovation and strategic edge.
        </p>
        <h2>
          <span class="bg-rose-100 text-rose-600 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-lg">Execute</span>
        </h2>
        <p class="p-4">
          Run a sequence of tasks, for each chunk. Automate repetitive processes, increase operational speed, and minimize human error. 
          With our execution framework, you can unlock higher efficiency, streamline your pipeline, and deliver on projects with confidence.
        </p>
        <h2> 
          <span class="bg-emerald-100 text-emerald-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-lg">Evaluate</span> 
        </h2> 
        <p class="p-4"> 
          Filter your outcomes by precise instructions, seamlessly narrowing massive datasets down to a single numeric value or revealing a broader spectrum of insights. 
          With smart evaluation logic, you’ll isolate the metrics that matter most, ensure data integrity, and empower your team to make swift, evidence-based decisions. 
        </p> 
        <h2> 
          <span class="bg-orange-100 text-orange-800 text-2xl font-medium me-2 px-2.5 py-0.5 rounded-lg">Enhance</span> 
        </h2> 
        <p class="p-4">
           Elevate your prompts and workflows by checking them against a set of proven best practices. 
           Our enhancement process diagnoses potential gaps and offers targeted recommendations, enabling you to refine your approach, optimize performance, and consistently produce stronger, more impactful outcomes. 
        </p>
      </div>
    </section>
    
    <div class="border-dashed border-4" style="background-color: #18181b; border-color: #f1f5f9;"></div> 

    <Footer />
  </div>
</template>

<style>
</style>