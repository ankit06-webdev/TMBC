// ---------Responsive-navbar-active-animation-----------
function test() {
	var tabsNewAnim = $('#navbarSupportedContent');
	var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top": itemPosNewAnimTop.top + "px",
		"left": itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click", "li", function (e) {
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top": itemPosNewAnimTop.top + "px",
			"left": itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function () {
	setTimeout(function () { test(); });
});
$(window).on('resize', function () {
	setTimeout(function () { test(); }, 500);
});
$(".navbar-toggler").click(function () {
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function () { test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if (path == '') {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
	// Add active class to target link
	target.parent().addClass('active');
});


// Handling zoom effect when clicked on image

// const zoom = (e) => {
// 	if(e.target.tagName === "IMG"){

// 		console.log("i am clicked", e.target)
// 	}
// 	else{
// 		console.log("i am not image", e.target, e.target.tagName)

// 	}
// }

// let container = document.querySelectorAll(".box");

// container.forEach((box)=>{
// 	box.addEventListener("click", zoom);
// })


// Updated zoom function for fullscreen display
const zoom = (e) => {
	console.log("Click detected on:", e.target);

	// Check if clicked element is an image
	if (e.target.tagName === 'IMG') {
		console.log("🖼️ Image clicked - Opening fullscreen");

		// Get all gallery images for navigation
		const allImages = document.querySelectorAll('.innerLatestArea .box img');
		const currentIndex = Array.from(allImages).indexOf(e.target);

		// Open fullscreen viewer
		openFullscreenViewer(e.target, currentIndex, allImages);

	} else {
		console.log("❌ Not an image clicked");

		// If clicked on box container, find image inside
		if (e.target.classList.contains('box')) {
			const imageInBox = e.target.querySelector('img');
			if (imageInBox) {
				imageInBox.click(); // Trigger image click
			}
		}
	}
};

// Main fullscreen viewer function
function openFullscreenViewer(imageElement, currentIndex, allImages) {
	// Remove existing viewer if any
	const existingViewer = document.getElementById('fullscreenViewer');
	if (existingViewer) {
		existingViewer.remove();
	}

	// Create fullscreen viewer HTML
	const viewer = document.createElement('div');
	viewer.id = 'fullscreenViewer';
	viewer.innerHTML = `
        <div class="fullscreen-overlay">
            <!-- Close button -->
            <button class="fullscreen-close" title="Close (ESC)">
                <i class="fas fa-times"></i>
            </button>
            
            <!-- Navigation arrows -->
            <button class="fullscreen-nav fullscreen-prev" title="Previous (←)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="fullscreen-nav fullscreen-next" title="Next (→)">
                <i class="fas fa-chevron-right"></i>
            </button>
            
            <!-- Image container -->
            <div class="fullscreen-image-container">
                <img class="fullscreen-image" src="${imageElement.src}" alt="${imageElement.alt}">
            </div>
            
            <!-- Image info -->
            <div class="fullscreen-info">
                <span class="image-counter">${currentIndex + 1} / ${allImages.length}</span>
                <span class="image-title">${imageElement.alt || 'Gallery Image'}</span>
            </div>
            
            <!-- Thumbnail strip (optional) -->
            <div class="fullscreen-thumbnails">
                ${Array.from(allImages).map((img, index) =>
		`<img class="thumbnail ${index === currentIndex ? 'active' : ''}" 
                          src="${img.src}" 
                          data-index="${index}"
                          alt="Thumbnail ${index + 1}">`
	).join('')}
            </div>
        </div>
    `;

	// Add comprehensive CSS styles
	const styles = `
        <style id="fullscreenViewerStyles">
        #fullscreenViewer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 99999;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease-out;
        }
        
        .fullscreen-overlay {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .fullscreen-image-container {
            position: relative;
            max-width: 90vw;
            max-height: 85vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .fullscreen-image {
            max-width: 50%;
            max-height: 100%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
            transition: transform 0.3s ease;
            cursor: zoom-in;
        }
        
        .fullscreen-image:hover {
            transform: scale(1.02);
        }
        
        .fullscreen-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 24px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .fullscreen-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        .fullscreen-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        
        .fullscreen-nav:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
        }
        
        .fullscreen-prev {
            left: 20px;
        }
        
        .fullscreen-next {
            right: 20px;
        }
        
        .fullscreen-info {
            position: absolute;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
            background: rgba(0, 0, 0, 0.7);
            padding: 15px 25px;
            border-radius: 25px;
            backdrop-filter: blur(10px);
        }
        
        .image-counter {
            font-size: 16px;
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }
        
        .image-title {
            font-size: 14px;
            opacity: 0.9;
        }
        
        .fullscreen-thumbnails {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 8px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 20px;
            backdrop-filter: blur(10px);
            max-width: 80vw;
            overflow-x: auto;
            scrollbar-width: none;
        }
        
        .fullscreen-thumbnails::-webkit-scrollbar {
            display: none;
        }
        
        .thumbnail {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
            cursor: pointer;
            opacity: 0.6;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .thumbnail:hover {
            opacity: 0.9;
            transform: scale(1.1);
        }
        
        .thumbnail.active {
            opacity: 1;
            border-color: #FF5F1F;
            transform: scale(1.15);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .fullscreen-image-container {
                max-width: 95vw;
                max-height: 75vh;
            }
            .fullscreen-image {
    			max-width: 100%;
			}
            .fullscreen-nav {
                width: 45px;
                height: 45px;
                font-size: 20px;
            }
            
            .fullscreen-close {
                width: 40px;
                height: 40px;
                font-size: 18px;
                top: 15px;
                right: 15px;
            }
            
            .fullscreen-info {
                bottom: 100px;
                font-size: 14px;
                padding: 10px 20px;
            }
            
            .fullscreen-thumbnails {
                bottom: 5px;
                max-width: 90vw;
            }
            
            .thumbnail {
                width: 40px;
                height: 40px;
            }
        }
        
        /* Hide navigation if only one image */
        #fullscreenViewer[data-single-image="true"] .fullscreen-nav,
        #fullscreenViewer[data-single-image="true"] .fullscreen-thumbnails {
            display: none;
        }
        </style>
    `;

	// Add styles to head if not already added
	if (!document.getElementById('fullscreenViewerStyles')) {
		document.head.insertAdjacentHTML('beforeend', styles);
	}

	// Set single image attribute
	if (allImages.length === 1) {
		viewer.setAttribute('data-single-image', 'true');
	}

	// Add to document
	document.body.appendChild(viewer);
	document.body.style.overflow = 'hidden'; // Prevent body scroll

	// Initialize viewer functionality
	initializeFullscreenViewer(currentIndex, allImages);

	console.log('✅ Fullscreen viewer opened');
}

// Initialize viewer functionality
function initializeFullscreenViewer(currentIndex, allImages) {
	let currentImageIndex = currentIndex;

	// Get elements
	const viewer = document.getElementById('fullscreenViewer');
	const closeBtn = viewer.querySelector('.fullscreen-close');
	const prevBtn = viewer.querySelector('.fullscreen-prev');
	const nextBtn = viewer.querySelector('.fullscreen-next');
	const image = viewer.querySelector('.fullscreen-image');
	const counter = viewer.querySelector('.image-counter');
	const title = viewer.querySelector('.image-title');
	const thumbnails = viewer.querySelectorAll('.thumbnail');

	// Close viewer function
	function closeViewer() {
		viewer.remove();
		document.body.style.overflow = 'auto';
		document.removeEventListener('keydown', handleKeyPress);
		console.log('📤 Fullscreen viewer closed');
	}

	// Update image function
	function updateImage(index) {
		currentImageIndex = index;
		const newImage = allImages[index];

		// Update main image with fade effect
		image.style.opacity = '0';
		setTimeout(() => {
			image.src = newImage.src;
			image.alt = newImage.alt;
			image.style.opacity = '1';
		}, 150);

		// Update info
		counter.textContent = `${index + 1} / ${allImages.length}`;
		title.textContent = newImage.alt || `Gallery Image ${index + 1}`;

		// Update active thumbnail
		thumbnails.forEach((thumb, i) => {
			thumb.classList.toggle('active', i === index);
		});

		// Scroll active thumbnail into view
		if (thumbnails[index]) {
			thumbnails[index].scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'center'
			});
		}
	}

	// Navigation functions
	function showNext() {
		const nextIndex = (currentImageIndex + 1) % allImages.length;
		updateImage(nextIndex);
	}

	function showPrevious() {
		const prevIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
		updateImage(prevIndex);
	}

	// Event listeners
	closeBtn.addEventListener('click', closeViewer);
	prevBtn.addEventListener('click', showPrevious);
	nextBtn.addEventListener('click', showNext);

	// Click outside to close
	viewer.addEventListener('click', (e) => {
		if (e.target === viewer || e.target.classList.contains('fullscreen-overlay')) {
			closeViewer();
		}
	});

	// Thumbnail clicks
	thumbnails.forEach((thumb, index) => {
		thumb.addEventListener('click', () => {
			updateImage(index);
		});
	});

	// Keyboard navigation
	function handleKeyPress(e) {
		switch (e.key) {
			case 'Escape':
				closeViewer();
				break;
			case 'ArrowLeft':
				showPrevious();
				break;
			case 'ArrowRight':
				showNext();
				break;
			case ' ': // Spacebar
				e.preventDefault();
				showNext();
				break;
		}
	}

	document.addEventListener('keydown', handleKeyPress);

	// Touch/swipe support for mobile
	let touchStartX = 0;
	let touchEndX = 0;

	image.addEventListener('touchstart', (e) => {
		touchStartX = e.changedTouches[0].screenX;
	});

	image.addEventListener('touchend', (e) => {
		touchEndX = e.changedTouches[0].screenX;
		handleSwipe();
	});

	function handleSwipe() {
		const swipeThreshold = 50;
		const diff = touchStartX - touchEndX;

		if (Math.abs(diff) > swipeThreshold) {
			if (diff > 0) {
				showNext(); // Swipe left = next
			} else {
				showPrevious(); // Swipe right = previous
			}
		}
	}
}

// Update your existing script.js
$(document).ready(function () {
	// Your existing code...
	setTimeout(function () { test(); });

	// Gallery functionality
	let container = document.querySelector(".innerLatestArea");

	if (container) {
		container.addEventListener("click", zoom);
		console.log('✅ Fullscreen gallery initialized');

		// Add loading cursor to images
		const images = container.querySelectorAll('img');
		images.forEach(img => {
			img.style.cursor = 'pointer';
			img.title = 'Click to view fullscreen';
		});
	}
});

// Alternative: Direct image click handlers (recommended)
$(document).ready(function () {
	const galleryImages = document.querySelectorAll('.innerLatestArea .box img');

	galleryImages.forEach((img, index) => {
		img.style.cursor = 'pointer';
		img.title = 'Click to view fullscreen';

		img.addEventListener('click', (e) => {
			e.stopPropagation(); // Prevent event bubbling
			console.log(`🖼️ Direct click on image ${index + 1}`);
			openFullscreenViewer(e.target, index, galleryImages);
		});

		// Hover effect
		img.addEventListener('mouseenter', () => {
			img.style.transform = 'scale(1.02)';
			img.style.transition = 'transform 0.2s ease';
		});

		img.addEventListener('mouseleave', () => {
			img.style.transform = 'scale(1)';
		});
	});

	console.log(`✅ Fullscreen viewer attached to ${galleryImages.length} images`);
});
