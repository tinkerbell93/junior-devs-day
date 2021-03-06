(() => {
  const actions = {
    icons(type) {
      const iconElems = document.querySelectorAll('.icons div');
      if (type) {
        for (let i = 0; i < iconElems.length; i++) {
          iconElems[i].style.animation = `show 1.5s ${i * 0.3
            }s alternate infinite`;
        }
      } else {
        for (let i = 0; i < iconElems.length; i++) {
          iconElems[i].style.animation = 'none';
        }
      }
    },
    dog(type) {
      if (type) {
        document.querySelector('.dog').style.transform = `translateX(${window.innerWidth * 0.7
          }px)`;
        document.querySelector('[data-action="dog"] .motion').style.animation =
          'ani-step 0.5s 0.5s infinite';
      } else {
        document.querySelector('.dog').style.transform = 'translateX(0%)';
        document.querySelector('[data-action="dog"] .motion').style.animation =
          'none';
      }
    },
  };

  const graphicElems = document.querySelectorAll('.graphic-item');
  const stepElems = document.querySelectorAll('.step');
  let curGraphic = graphicElems[0];
  let ioIndex;

  const progressBar = document.querySelector('.progress-bar');

  const scrollBtn = document.querySelector('.scroll-btn button');

  // 프로그레스 바
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const documentHight = document.body.offsetHeight;
    const windowHight = window.outerHeight;
    const per = Math.ceil((scrollTop / (documentHight - windowHight)) * 100);

    progressBar.style.width = `${per}%`;
  });

  // 스크롤 버튼
  scrollBtn.addEventListener('click', () => {
    scrollTo({
      top: innerHeight,
      left: 0,
      behavior: 'smooth',
    });
  });

  // IntersectionObserver
  const io = new IntersectionObserver((entries, observe) => {
    // 현재 보이는 target을 확인
    ioIndex = entries[0].target.dataset.index * 1;
  });

  // dataset으로 data-*** 속성 넣기
  for (let i = 0; i < stepElems.length; i++) {
    // 관찰 대상을 설정
    io.observe(stepElems[i]);

    graphicElems[i].dataset.index = i;
    stepElems[i].dataset.index = i;
  }

  // 말풍선 출력
  const activate = (action) => {
    curGraphic.classList.add('visible');
    if (action) {
      actions[action](true);
    }
  };
  // 말풍선 숨기기
  const inactivate = (action) => {
    curGraphic.classList.remove('visible');
    if (action) {
      actions[action](false);
    }
  };

  // 스크롤 이벤트
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    // 말풍선 위치 확인
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();

      // 위치에 맞는 말풍선 출력
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        if (curGraphic) {
          inactivate(curGraphic.dataset.action);
        }
        curGraphic = graphicElems[step.dataset.index];
        activate(curGraphic.dataset.action);
      }
    }
  });

  window.addEventListener('load', () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 10);
  });
  activate();
})();
