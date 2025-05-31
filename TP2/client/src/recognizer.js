class Point {
  constructor(x, y, id = 0) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
}

class Gesture {
  constructor(name, points) {
    this.name = name;
    this.points = recognizer.resample(points, 64);
    this.points = recognizer.scale(this.points);
    this.points = recognizer.translateTo(this.points, { x: 0, y: 0 });
  }
}

const recognizer = {
  gestures: [],

  addGesture(name, points) {
    this.gestures.push(new Gesture(name, points));
  },

  recognize(points) {
    if (this.gestures.length === 0) {
      return { name: "Aucune forme enregistrée", score: 0 };
    }

    let candidate = new Gesture("", points);

    let bestScore = Infinity;
    let bestGesture = null;

    for (let gesture of this.gestures) {
      let dist = this.greedyCloudMatch(candidate.points, gesture.points);
      if (dist < bestScore) {
        bestScore = dist;
        bestGesture = gesture.name;
      }
    }

    const score = Math.max((2 - bestScore) / 2, 0); // Score normalisé
    return { name: bestGesture, score };
  },

  resample(points, n) {
    const I = this.pathLength(points) / (n - 1);
    let D = 0.0;
    const newPoints = [points[0]];

    for (let i = 1; i < points.length; i++) {
      if (points[i].id === points[i - 1].id) {
        const d = this.distance(points[i - 1], points[i]);
        if ((D + d) >= I) {
          const qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
          const qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
          const q = new Point(qx, qy, points[i].id);
          newPoints.push(q);
          points.splice(i, 0, q);
          D = 0.0;
        } else {
          D += d;
        }
      }
    }

    if (newPoints.length === n - 1) {
      newPoints.push(points[points.length - 1]);
    }

    return newPoints;
  },

  scale(points) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let p of points) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }

    const size = Math.max(maxX - minX, maxY - minY);
    return points.map(p => new Point((p.x - minX) / size, (p.y - minY) / size, p.id));
  },

  translateTo(points, center) {
    const c = this.centroid(points);
    return points.map(p => new Point(p.x + center.x - c.x, p.y + center.y - c.y, p.id));
  },

  centroid(points) {
    const sum = points.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
    return { x: sum.x / points.length, y: sum.y / points.length };
  },

  pathLength(points) {
    let d = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].id === points[i - 1].id) {
        d += this.distance(points[i - 1], points[i]);
      }
    }
    return d;
  },

  distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  },

  greedyCloudMatch(points1, points2) {
    const n = points1.length;
    const step = Math.floor(Math.pow(n, 0.5));

    let minDist = Infinity;
    for (let i = 0; i < n; i += step) {
      const d1 = this.cloudDistance(points1, points2, i);
      const d2 = this.cloudDistance(points2, points1, i);
      minDist = Math.min(minDist, d1, d2);
    }
    return minDist;
  },

  cloudDistance(pts1, pts2, start) {
    const n = pts1.length;
    const matched = new Array(n).fill(false);
    let sum = 0;
    let i = start;

    do {
      let minDist = Infinity;
      let index = -1;
      for (let j = 0; j < n; j++) {
        const d = this.distance(pts1[i], pts2[j]);
        if (d < minDist && !matched[j]) {
          minDist = d;
          index = j;
        }
      }
      matched[index] = true;
      sum += minDist;
      i = (i + 1) % n;
    } while (i !== start);

    return sum / n;
  },

  init() {
    this.addGesture("Swipe Droite", [
      new Point(50, 100), new Point(150, 100)
    ]);

    this.addGesture("Swipe Gauche", [
      new Point(150, 100), new Point(50, 100)
    ]);

    this.addGesture("Ligne Horizontale", [
      new Point(50, 100), new Point(150, 100)
    ]);

    // Cercle grossier
    const circle = [];
    const radius = 50;
    const center = { x: 100, y: 100 };
    for (let angle = 0; angle <= Math.PI * 2; angle += 0.2) {
      circle.push(new Point(center.x + radius * Math.cos(angle), center.y + radius * Math.sin(angle)));
    }
    this.addGesture("Cercle", circle);
  }
};

recognizer.init();

export { Point };
export default recognizer;
