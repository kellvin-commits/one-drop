      const API_BASE_URL='https://one-drop-main-server.onrender.com';
      // Custom animation handler
      function animateOnScroll() {
          const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
          
          elements.forEach(element => {
              const elementTop = element.getBoundingClientRect().top;
              const elementVisible = 150;
              
              if (elementTop < window.innerHeight - elementVisible) {
                  element.classList.add('visible');
              }
          });
      }
      // Initialize animations on scroll
      window.addEventListener('scroll', animateOnScroll);
      
      // Trigger animations on page load
      document.addEventListener('DOMContentLoaded', function() {
          animateOnScroll();
          fetchGallery();
          fetchVideos();
          fetchProjectData();
          fetchProfilePic();
          loadSettings();
      }); 
      async function loadSettings(){
        try {

     const res=await fetch(`${API_BASE_URL}/api/setting/get`);
   const data=await res.json();
   const result=data.data
   if(res.ok){
       document.getElementById("phoneIn").innerText=result.phone;
       document.getElementById("add").innerText=result.address;
       document.getElementById("mail").innerText=result.email;
       document.querySelector(".logo").innerText=result.name;
       document.getElementById("face").href=result.url
   }else{
       alert("Error in updating settings!")
   }
            
        } catch (error) {
            console.log(error);
            alert("Error while updating settings!")
            
        }
     
     
     
     
     
setInterval(loadSettings(),3000);
     
     
     
     
     

      }
      async function fetchProfilePic() {
        try {
            const res=await fetch(`${API_BASE_URL}/api/profile/get`);
            const data=await res.json();
            const result=data.data
            let profileData='';

            if(res.ok){
                result.forEach((item)=>{
                    profileData+=`
                     <img src="${API_BASE_URL}${item.src}" alt="${item.title}">
                    `
                })
                document.querySelector(".about-image").innerHTML=profileData
                

            }else{
                alert("Fail to upload gallery data!")
            }
            
        } catch (error) {
            console.log(error);
            alert("Something went wrong with profile picture!!")
            
        }
        
      }

      async function fetchProjectData(){
        let projectMain='';
        try {
            const res=await fetch(`${API_BASE_URL}/api/project/get`);
            const data=await res.json();
            const result=data.data
            if(res.ok){
                result.forEach((project)=>{
                    projectMain+=`

                     <div class="project-card fade-in">
                  <div class="project-image">
                  <img src="${API_BASE_URL}${project.src}">
                  </div>
                <div class="project-content">
                   <h4>${project.name}</h4>
                 <p>${project.desc}</p>
                 <span class="pro-status ${project.status.toLowerCase()}">${project.status}</span>
                  </div>
                    </div>
                    `
                })
                document.querySelector(".projects-grid").innerHTML=projectMain;
                
            }else{
                alert("Failed to fetch project data!!")
            }
            
        } catch (error) {
            console.log(error);
            alert("Something with projects went wrong!")
            
        }
    
        
      }


      async function fetchGallery(){

    let mainGallery='';
    try {
        const res=await fetch(`${API_BASE_URL}/api/gallery/get`);
        const data=await res.json();
        const result=data.data
        if(res.ok){
            result.forEach((img)=>{
                mainGallery+=`
                 <div class="gallery-item scale-in">
               <img src="${API_BASE_URL}${img.src}" alt="${img.title}">
               <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
               </div>
                   </div>
                
                
                `

            })
            document.querySelector(".gallery-grid").innerHTML=mainGallery;
            
        }else{
            alert(data.message)
        }
        
        
    } catch (error) {
        console.log(error);
        alert('Something went wrong!')

        
    }
        


      }
      // Mobile menu toggle
      function toggleMenu() {
          const navLinks = document.getElementById('navLinks');
          const toggleButton = document.querySelector('.mobile-toggle i');
          
          navLinks.classList.toggle('active');
          
          // Change hamburger to X and vice versa
          if (navLinks.classList.contains('active')) {
              toggleButton.classList.remove('fa-bars');
              toggleButton.classList.add('fa-times');
          } else {
              toggleButton.classList.remove('fa-times');
              toggleButton.classList.add('fa-bars');
          }
      }
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-links a').forEach(link => {
          link.addEventListener('click', () => {
              const navLinks = document.getElementById('navLinks');
              const toggleButton = document.querySelector('.mobile-toggle i');
              
              navLinks.classList.remove('active');
              toggleButton.classList.remove('fa-times');
              toggleButton.classList.add('fa-bars');
          });
      });
      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              e.preventDefault();
              const target = document.querySelector(this.getAttribute('href'));
              if (target) {
                  const headerHeight = document.querySelector('header').offsetHeight;
                  const targetPosition = target.offsetTop - headerHeight;
                  
                  window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                  });
              }
          });
      });
      // Video modal functionality
      async function fetchVideos(){
        let videoHtml='';
        try {
            const res=await fetch(`${API_BASE_URL}/api/video/get`);
            const data=await res.json();
            const result=data.data;
            if(res.ok){
                result.forEach((video)=>{
                    videoHtml+=`
                      <div class="video-thumbnail fade-in">
            <img src="${video.src}" alt="${video.title}">
            <video width="100%" controls>
            <source src="${API_BASE_URL}${video.src}" type="video/mp4">
            </video>
            <div class="play-button">
            <i class="fas fa-play"></i>
          </div>
            </div>
                    `
                });
                document.querySelector(".video-grid").innerHTML=videoHtml;
            }else{
                alert("Failed to fetch videos!")
            }
            
        } catch (error) {
            console.log(error);
            alert("Something went wrong!");
            
        }
        
      }

      
      // Form submission handler
      async function handleSubmit(event) {
          event.preventDefault();
          
          // Get form data
          const formData = new FormData(event.target);
          const name = event.target.querySelector('input[type="text"]').value.trim();
          const from = event.target.querySelector('input[type="email"]').value.trim();
          const phone = event.target.querySelector('input[type="tel"]').value.trim();
          const subject = event.target.querySelector('textarea').value.trim();
          
          // Simple validation
          if (!name || !from  || !subject) {
              alert('Please fill in all fields');
              return;
          }
          if(!from.includes(".")){
              alert("Please enter a valid email address!");
              return
          }
          try{
              const response=await fetch(`${API_BASE_URL}/api/message/add`,{
                  method:'POST',
                  headers:{
                      'Content-Type':'application/json'
                  },
                  body:JSON.stringify({name,from,subject})
              });
              const data=await response.json();
              if(response.ok){
                  alert(`${data.message} We will give you the feedback soon!,Thnak you`);
                  event.target.reset();
              }else{
                  alert(data.message)
              }
          }catch(error){
              console.log(error);
              alert("Something went wrong!Please try again")
          }
      }
      // Header scroll effect
      window.addEventListener('scroll', function() {
          const header = document.querySelector('header');
          if (window.scrollY > 100) {
              header.style.background = 'linear-gradient(135deg, rgba(33,150,243,0.95), rgba(25,118,210,0.95))';
              header.style.backdropFilter = 'blur(10px)';
          } else {
              header.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
              header.style.backdropFilter = 'none';
          }
      });
      // Gallery image click handler
      document.querySelectorAll('.gallery-item').forEach(item => {
          item.addEventListener('click', function() {
              const img = this.querySelector('img');
              if (img) {
                  // Create a simple lightbox effect
                  const lightbox = document.createElement('div');
                  lightbox.style.cssText = `
                      position: fixed;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      background: rgba(0,0,0,0.9);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      z-index: 2000;
                      cursor: pointer;
                  `;
                  
                  const lightboxImg = document.createElement('img');
                  lightboxImg.src = img.src;
                  lightboxImg.style.cssText = `
                      max-width: 90%;
                      max-height: 90%;
                      object-fit: contain;
                      border-radius: 10px;
                  `;
                  
                  lightbox.appendChild(lightboxImg);
                  document.body.appendChild(lightbox);
                  
                  // Close lightbox on click
                  lightbox.addEventListener('click', function() {
                      document.body.removeChild(lightbox);
                  });
              }
          });
      });
      // Counter animation for statistics (if needed)
      function animateCounter(element, target, duration = 2000) {
          let start = 0;
          const increment = target / (duration / 16);
          
          const timer = setInterval(() => {
              start += increment;
              element.textContent = Math.floor(start);
              
              if (start >= target) {
                  element.textContent = target;
                  clearInterval(timer);
              }
          }, 16);
      }
      // Intersection Observer for counter animation
      const observerOptions = {
          threshold: 0.5,
          rootMargin: '0px 0px -100px 0px'
      };
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // Add any scroll-triggered animations here
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
              }
          });
      }, observerOptions);
      // Observe elements for scroll animations
      document.querySelectorAll('.service-card, .project-card').forEach(el => {
          observer.observe(el);
      });
      // Preload critical images
      function preloadImages() {
          const imageUrls = [
              'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
              'https://images.unsplash.com/photo-1558618666-fcd25b11cd2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
          ];
          
          imageUrls.forEach(url => {
              const img = new Image();
              img.src = url;
          });
      }
      // Initialize everything when DOM is loaded
      document.addEventListener('DOMContentLoaded', function() {
          preloadImages();
          
          // Add loading animation
          document.body.style.opacity = '0';
          setTimeout(() => {
              document.body.style.transition = 'opacity 0.5s ease';
              document.body.style.opacity = '1';
          }, 100);
      });
      // Performance optimization: Lazy loading for images
      if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      img.classList.remove('lazy');
                      imageObserver.unobserve(img);
                  }
              });
          });
          document.querySelectorAll('img[data-src]').forEach(img => {
              imageObserver.observe(img);
          });
      }
      // Service worker registration for PWA capabilities (optional)
      if ('serviceWorker' in navigator) {
          window.addEventListener('load', () => {
              // Service worker would be registered here for offline capabilities
              console.log('PWA features available');
          });
      }
      // Add touch gesture support for mobile
      let touchStartX = 0;
      let touchEndX = 0;
      document.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
      });
      document.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleGesture();
      });
      function handleGesture() {
          const swipeThreshold = 50;
          const diff = touchStartX - touchEndX;
          
          if (Math.abs(diff) > swipeThreshold) {
              // Handle swipe gestures for mobile navigation
              if (diff > 0) {
                  // Swipe left - could implement gallery navigation
              } else {
                  // Swipe right - could implement gallery navigation
              }
          }
      }