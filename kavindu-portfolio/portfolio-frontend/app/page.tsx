"use client";
import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, useReducedMotion, AnimatePresence, useSpring } from 'framer-motion';
import {
  Smartphone, Database, Server, Cpu, ShieldCheck,
  ArrowRight, ArrowUpRight, Menu, X, Check, Copy,
  Maximize2, Search, Terminal, Sparkles,
  MessageSquare, Mail,
  Clock, Zap, Activity, Code2, ChevronDown, Award,
  Send, Play, Volume2, VolumeX, CheckCircle2,
  Share2, ArrowDown, Radio
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Web Audio API Synthesizer (Micro-Interaction Sound Effects)         */
/* ------------------------------------------------------------------ */

class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playBlip(freq = 480, duration = 0.06) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext fallback
    }
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.03, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.15);
      });
    } catch {
      // ignore
    }
  }
}

const sfx = new SoundFX();

/* ------------------------------------------------------------------ */
/* Helper Components & Icons                                          */
/* ------------------------------------------------------------------ */

function ImageWithFallback({
  src,
  alt,
  className,
  fallback = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
  ...rest
}: { src: string; alt: string; className?: string; fallback?: string } & React.ImgHTMLAttributes<HTMLImageElement>) {
  const [hasError, setHasError] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={hasError ? fallback : (src || fallback)}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Data Structures & Content                                          */
/* ------------------------------------------------------------------ */

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  images?: string[];
  tags: string[];
  category: 'Backend System' | 'Enterprise Platform' | 'Mobile App' | 'AI & IoT' | 'Full-Stack';
  year: string;
  status: 'Production Live' | 'Completed Research' | 'Active Deployment';
  client: string;
  metrics?: string;
  architecturePoints: string[];
  codePreview?: string;
  liveUrl?: string;
  repoUrl?: string;
}

const ALL_PROJECTS: Project[] = [
  {
    id: 'asb-broadcast',
    name: 'ASB Broadcast Management System',
    tagline: 'High-throughput multichannel marketing & notification engine',
    description: 'Enterprise communication gateway delivering personalized SMS, Meta WhatsApp Cloud API messages, and email campaigns to over 200,000+ active loyalty customers.',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200',
    tags: ['PHP', 'MySQL', 'Hutch SMS API', 'Meta WhatsApp API', 'Redis Queue', 'cPanel'],
    category: 'Backend System',
    year: '2026',
    status: 'Production Live',
    client: 'ASB Fashion (Pvt) Ltd',
    metrics: '200,000+ Active Customers • Scaled to 1M Capacity',
    architecturePoints: [
      'Engineered asynchronous background job queues handling rate-limited carrier dispatching without blocking UI requests.',
      'Direct integration with Meta WhatsApp Graph Cloud API & Hutch Telecom SMS gateways with instant webhook delivery receipts.',
      'Comprehensive customer segmentation filters (purchase history, loyalty tier, demographic, city).',
      'Real-time delivery telemetry, bounce rate tracking, and automated failure retry pipelines.'
    ],
    codePreview: `// High-concurrency broadcast queue worker
function dispatchBroadcastBatch(PDO $db, array $campaign): array {
    $stmt = $db->prepare("SELECT id, phone_number, customer_name FROM loyalty_customers WHERE tier = ? LIMIT 500");
    $stmt->execute([$campaign['target_tier']]);
    $recipients = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $results = ['success' => 0, 'queued' => 0];
    foreach ($recipients as $recipient) {
        $payload = formatWhatsAppTemplate($campaign['template_name'], $recipient);
        MetaCloudGateway::enqueueMessage($payload, priority: 'high');
        $results['queued']++;
    }
    return $results;
}`
  },
  {
    id: 'asb-purchasing',
    name: 'ASB Purchasing Order Management System',
    tagline: 'Internal enterprise procurement & inventory quality pipeline',
    description: 'Comprehensive workflow automation platform managing end-to-end purchase order creation, multi-level management approvals, goods receiving, and stringent quality checking.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200',
    tags: ['Vanilla JS', 'PHP REST APIs', 'MySQL', 'Tailwind CSS', 'Role RBAC'],
    category: 'Enterprise Platform',
    year: '2026',
    status: 'Production Live',
    client: 'ASB Fashion (Pvt) Ltd',
    metrics: 'Zero discrepancies across 15+ retail branch channels',
    architecturePoints: [
      'Role-based Access Control (RBAC) separating Store Keepers, Department Heads, Finance Directors, and Quality Inspectors.',
      'ACID transactional database schema ensuring zero stock discrepancies between ordered, received, and approved goods.',
      'Live barcode/SKU verification module during initial warehouse goods unloading.',
      'Automated PDF invoice/PO generation and email dispatching to suppliers upon executive sign-off.'
    ]
  },
  {
    id: 'asb-official-web',
    name: 'ASB Fashion Official Web Platform',
    tagline: 'Modern digital storefront & online gift voucher purchasing hub',
    description: 'Official consumer portal for one of Sri Lanka’s premier fashion retail chains, featuring interactive collections, store locators, promotions, and instant online voucher sales.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    tags: ['React.js', 'PHP Backend', 'MySQL', 'Payment Gateways', 'SEO Schema'],
    category: 'Enterprise Platform',
    year: '2026',
    status: 'Production Live',
    client: 'ASB Fashion (Pvt) Ltd',
    metrics: '99.9% Uptime • Sub-second page loads • High SEO rank',
    architecturePoints: [
      'Dynamic product showcases synchronized with internal inventory feeds.',
      'Secure digital voucher issuance system with unique cryptographic QR validation codes for in-store redemption.',
      'Advanced technical SEO structuring with schema.org rich snippets, breadcrumbs, and OpenGraph optimization.',
      'High-conversion responsive design optimized for Sri Lankan mobile shoppers.'
    ]
  },
  {
    id: 'floodmind-iot',
    name: 'FloodMind - Kelani River Early Flood Warning',
    tagline: 'Machine learning hydrological forecasting & IoT sensor network',
    description: 'BSc Research project featuring machine learning water-level prediction models, solar-powered IoT ultrasonic hardware stations, and automated real-time alert dispatching.',
    imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=1200',
    tags: ['Python', 'XGBoost', 'PHP REST API', 'Arduino UNO', 'Ultrasonic Sensors', 'IoT'],
    category: 'AI & IoT',
    year: '2026',
    status: 'Completed Research',
    client: 'University of Bedfordshire (UK Research)',
    metrics: '94.6% Prediction Accuracy • 30-min Early Warning Lead Time',
    architecturePoints: [
      'Trained XGBoost regression models on historical rainfall and river discharge data along Kelani River basin.',
      'Deployed Arduino hardware stations transmitting ultrasonic water-level readings via cellular REST APIs.',
      'Multi-tier automated alert system triggering immediate SMS and email warnings to disaster response officials upon threshold breaches.',
      'Interactive dashboard for hydrological researchers with live telemetry charts and predictive flood curves.'
    ],
    codePreview: `import xgboost as xgb
import numpy as np

def predict_flood_risk(sensor_telemetry: dict, model_path: str = "models/kelani_xgboost.json"):
    model = xgb.Booster()
    model.load_model(model_path)
    
    features = np.array([[
        sensor_telemetry["water_level_cm"],
        sensor_telemetry["rainfall_rate_mm_hr"],
        sensor_telemetry["delta_rate_15m"],
        sensor_telemetry["upstream_inflow"]
    ]])
    
    dmatrix = xgb.DMatrix(features)
    risk_prob = model.predict(dmatrix)[0]
    return {"risk_score": float(risk_prob), "alert_level": "CRITICAL" if risk_prob > 0.85 else "NORMAL"}`
  },
  {
    id: 'brainana-game',
    name: 'Brainana - Math & Logic Android Game',
    tagline: 'Native Kotlin Android game powered by Jetpack Compose',
    description: 'Engaging native Android game focused on interactive mathematics puzzles, algorithmic challenges, dynamic difficulty scaling, and fluid 60FPS UI animations.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    tags: ['Kotlin', 'Jetpack Compose', 'Android SDK', 'Room DB', 'Coroutines'],
    category: 'Mobile App',
    year: '2025',
    status: 'Production Live',
    client: 'Independent Release',
    metrics: '60 FPS Smooth Frame Budget • Zero Memory Leaks',
    architecturePoints: [
      'Engineered with modern Jetpack Compose declarative UI and Kotlin Coroutines for seamless asynchronous puzzle generation.',
      'Clean MVVM (Model-View-ViewModel) architecture ensuring strict separation between game logic and render pipeline.',
      'Local persistence with Android Room Database for offline gameplay, high scores, and achievement unlocks.',
      'Optimized memory footprint ensuring battery-efficient execution across budget to flagship Android devices.'
    ]
  },
  {
    id: 'arrow-food-api',
    name: 'Arrow Food - Scalable Backend API Platform',
    tagline: 'High-performance microservices architecture & REST API',
    description: 'Enterprise backend designed for food delivery logistics, featuring JWT token authentication, order state machines, driver matching algorithms, and MongoDB caching.',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'REST API'],
    category: 'Backend System',
    year: '2025',
    status: 'Production Live',
    client: 'Production System',
    metrics: 'Sub-25ms Endpoint Response Times • Robust Schema Validation',
    architecturePoints: [
      'Modular route clustering with Express.js middlewares for authentication, rate-limiting, and error interception.',
      'Structured MongoDB schema with geospatial indexing for fast nearby restaurant & courier queries.',
      'Secure password hashing with Argon2 and stateless JWT session management.',
      'Comprehensive Postman test suites and Swagger/OpenAPI documentation.'
    ]
  },
  {
    id: 'downvid-transcoder',
    name: 'DownVid - Server-Side Media Transcoder',
    tagline: 'High-speed media processing engine & streaming utility',
    description: 'Full-stack utility platform that handles video/audio stream extraction, multi-format transcoding, and optimized downloading using yt-dlp and FFmpeg server instances.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    tags: ['React.js', 'Node.js', 'Python', 'yt-dlp', 'FFmpeg', 'WebSocket'],
    category: 'Full-Stack',
    year: '2025',
    status: 'Production Live',
    client: 'Utility Software',
    metrics: 'Real-time WebSocket Progress Transcoding Pipeline',
    architecturePoints: [
      'Hybrid backend orchestrating Node.js API servers with Python worker child processes.',
      'FFmpeg streaming pipe converting heavy video streams directly to client buffers to save disk I/O.',
      'WebSocket connection providing live byte-level download & conversion percentage updates to the user.'
    ]
  },
  {
    id: 'ai-subtitle-pro',
    name: 'AI Subtitle Pro - Automated Transcription',
    tagline: 'Speech-to-text pipeline powered by OpenAI Whisper AI',
    description: 'AI-powered media engine that automatically transcribes spoken audio into synchronized subtitles (.SRT, .VTT) with millisecond-accurate timestamping.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    tags: ['Python', 'Whisper AI', 'Node.js', 'React', 'Audio Processing'],
    category: 'AI & IoT',
    year: '2025',
    status: 'Production Live',
    client: 'AI Utility Platform',
    metrics: '99% Word Recognition Accuracy across multiple accents',
    architecturePoints: [
      'Audio normalization and frequency filtering preprocessing with FFmpeg before neural model ingestion.',
      'Whisper AI speech model inference wrapper with configurable beam search parameters.',
      'Automated export into industry standard subtitle formats with custom styling options.'
    ]
  },
  {
    id: 'hire-us-platform',
    name: 'Hire Us - Verified Worker & Job Platform',
    tagline: 'Local service marketplace with national ID verification',
    description: 'Two-sided labor marketplace connecting skilled tradespeople with homeowners, featuring KYC verification, automated job matching, escrow tracking, and SMS alerts.',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    tags: ['PHP', 'MySQL', 'Java', 'Hostinger', 'SMS Notifications'],
    category: 'Enterprise Platform',
    year: '2025',
    status: 'Production Live',
    client: 'Commercial Platform',
    metrics: 'KYC identity approval in under 5 minutes',
    architecturePoints: [
      'Secure document upload and identity verification workflow with admin approval dashboard.',
      'Real-time job applicant dispatching and automated SMS alert notifications to workers.',
      'Rating & review algorithms that protect client safety and showcase top-rated workers.'
    ]
  },
  {
    id: 'statusbox-android',
    name: 'StatusBox - Android Media Vault',
    tagline: 'Native Android storage & media management engine',
    description: 'Lightweight Android application designed for organizing, previewing, and securing ephemeral media assets with optimized Android Storage Access Framework (SAF).',
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200',
    tags: ['Java', 'Kotlin', 'Android SDK', 'SAF Storage', 'Glide'],
    category: 'Mobile App',
    year: '2025',
    status: 'Production Live',
    client: 'Mobile Utility',
    metrics: '100% Android Scoped Storage Compliant (API 34+)',
    architecturePoints: [
      'Built strictly adhering to Android Scoped Storage guidelines for privacy and permission handling.',
      'High-performance thumbnail caching utilizing Glide and coroutine background disk scanners.'
    ]
  },
  {
    id: 'asb-loyal-vault',
    name: 'ASB Loyal Vault - Loyalty & Rewards Engine',
    tagline: 'Real-time retail points & promotional reward calculation',
    description: 'High-availability backend service running transactional point calculations, tier advancements, and voucher issuance for retail checkout POS terminals.',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?auto=format&fit=crop&q=80&w=1200',
    tags: ['PHP', 'MySQL', 'REST APIs', 'POS Integration', 'Redis'],
    category: 'Backend System',
    year: '2026',
    status: 'Production Live',
    client: 'ASB Fashion (Pvt) Ltd',
    metrics: 'Real-time calculations at POS checkout in < 40ms',
    architecturePoints: [
      'Atomic SQL transactions ensuring rewards and points are instantly credited and non-duplicable.',
      'Automated SMS notifications dispatched to shoppers immediately after in-store billing.'
    ]
  },
  {
    id: 'multi-carrier-sms',
    name: 'Multi-Carrier SMS Gateway Dispatcher',
    tagline: 'Fault-tolerant telecom routing engine with failover',
    description: 'Distributed microservice that balances and dispatches high-volume SMS messages across Hutch, Dialog, and Mobitel telecom APIs with automatic failover.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200',
    tags: ['Node.js', 'Express', 'Redis BullMQ', 'Telecom Gateways'],
    category: 'Backend System',
    year: '2025',
    status: 'Production Live',
    client: 'Telecom Infrastructure',
    metrics: '99.99% Message Delivery Success Rate via Fallback',
    architecturePoints: [
      'Intelligent health check monitoring on carrier API endpoints.',
      'Automatic routing rerouting if primary telecom provider experiences latency spikes or outages.'
    ]
  }
];

const CODE_SNIPPETS = [
  {
    id: 'broadcast-worker',
    title: 'BroadcastWorker.php',
    lang: 'php',
    domain: 'High-Throughput Campaign Engine',
    desc: 'Asynchronous campaign batch processor with Meta WhatsApp Cloud API rate limiting and webhook confirmation.',
    simulatedOutput: '✓ Batch #4092 Initialized\n✓ Acquired 500 queue locks from MySQL\n✓ Meta Cloud Gateway dispatched (200 OK)\n✓ Telemetry: 500/500 sent in 1.24s (0 failures)',
    code: `<?php
declare(strict_types=1);

namespace App\\Services\\Broadcast;

use App\\Infrastructure\\Database\\ConnectionPool;
use App\\Integrations\\Meta\\WhatsAppCloudClient;

final class BroadcastCampaignWorker
{
    public function __construct(
        private readonly ConnectionPool $dbPool,
        private readonly WhatsAppCloudClient $whatsapp
    ) {}

    public function processBatch(int $campaignId, int $batchSize = 250): BatchResult
    {
        $pdo = $this->dbPool->acquire();
        $stmt = $pdo->prepare("
            SELECT queue_id, phone_number, template_payload 
            FROM broadcast_queue 
            WHERE campaign_id = :id AND status = 'PENDING' 
            LIMIT :limit FOR UPDATE SKIP LOCKED
        ");
        $stmt->execute(['id' => $campaignId, 'limit' => $batchSize]);
        $jobs = $stmt->fetchAll();

        $dispatched = 0;
        foreach ($jobs as $job) {
            $response = $this->whatsapp->sendTemplate(
                to: $job['phone_number'],
                payload: json_decode($job['template_payload'], true)
            );
            
            if ($response->isSuccess()) {
                $this->markCompleted($pdo, $job['queue_id'], $response->getMessageId());
                $dispatched++;
            }
        }
        return new BatchResult(total: count($jobs), dispatched: $dispatched);
    }
}`
  },
  {
    id: 'order-pipeline',
    title: 'PurchaseOrderPipeline.ts',
    lang: 'typescript',
    domain: 'Enterprise Transaction Logic',
    desc: 'ACID transaction handling for multi-tier purchase order approvals and quality assurance verification.',
    simulatedOutput: '✓ Order PO-2026-889 Loaded\n✓ QA Pass: 1,200 units | Rejected: 0 units\n✓ Stock allocated to Central Hub #1\n✓ Audit record committed with cryptographic sign-off',
    code: `import { DatabaseTransaction, StockManager, AuditLogger } from '@/core/enterprise';

export interface QualityApprovalInput {
  orderId: string;
  inspectorId: string;
  passedQuantity: number;
  rejectedQuantity: number;
  rejectionReason?: string;
}

export async function processQualityCheck(
  input: QualityApprovalInput,
  tx: DatabaseTransaction
): Promise<{ status: 'APPROVED' | 'PARTIAL' | 'REJECTED'; receivedBatchId: string }> {
  const order = await tx.purchaseOrders.findById(input.orderId);
  if (!order || order.status !== 'PENDING_QA') {
    throw new Error('Invalid order state for quality verification.');
  }

  const isFullPass = input.rejectedQuantity === 0 && input.passedQuantity === order.expectedQuantity;
  const newStatus = isFullPass ? 'APPROVED' : (input.passedQuantity > 0 ? 'PARTIAL' : 'REJECTED');

  // Atomic warehouse inventory allocation
  const batch = await StockManager.allocateReceivedStock(tx, {
    sku: order.sku,
    acceptedQuantity: input.passedQuantity,
    warehouseId: order.destinationWarehouseId
  });

  await AuditLogger.record(tx, {
    action: 'QUALITY_CHECK_COMPLETED',
    userId: input.inspectorId,
    orderId: input.orderId,
    details: { passed: input.passedQuantity, rejected: input.rejectedQuantity }
  });

  return { status: newStatus, receivedBatchId: batch.id };
}`
  },
  {
    id: 'flood-model',
    title: 'FloodPredictor.py',
    lang: 'python',
    domain: 'AI & Hydrological Telemetry',
    desc: 'Real-time hydrological inference stream integrating ultrasonic IoT sensor readings with XGBoost prediction models.',
    simulatedOutput: '✓ Telemetry: Station #KR-04 (Water Level: 4.82m, Rain: 34mm/hr)\n✓ XGBoost Inference computed in 8.4ms\n✓ Risk Probability: 0.89 (CRITICAL)\n✓ Automated SMS alert dispatched to Disaster Management Center',
    code: `import numpy as np
import xgboost as xgb
from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class SensorReading:
    station_id: str
    water_level_m: float
    rainfall_1h_mm: float
    discharge_rate_m3s: float

class RiverFloodPredictor:
    def __init__(self, model_file: str):
        self.model = xgb.Booster()
        self.model.load_model(model_file)
        self.threshold_critical = 0.82

    def evaluate_telemetry(self, sensor: SensorReading) -> Dict[str, Any]:
        features = np.array([[
            sensor.water_level_m,
            sensor.rainfall_1h_mm,
            sensor.discharge_rate_m3s,
            (sensor.water_level_m * sensor.rainfall_1h_mm) # Interaction term
        ]])
        
        dmatrix = xgb.DMatrix(features)
        risk_probability = float(self.model.predict(dmatrix)[0])
        
        is_critical = risk_probability >= self.threshold_critical
        return {
            "station": sensor.station_id,
            "flood_risk_score": round(risk_probability * 100, 2),
            "threat_level": "RED_ALERT" if is_critical else "NORMAL",
            "dispatch_sms": is_critical
        }`
  },
  {
    id: 'compose-game',
    title: 'GameEngineState.kt',
    lang: 'kotlin',
    domain: 'Android Native UI Engine',
    desc: 'State hoisting and 60FPS reactive game loop optimization using Jetpack Compose and Kotlin StateFlow.',
    simulatedOutput: '✓ GameLoop initialized (Target: 60 FPS)\n✓ Frame Budget: 16.6ms | Actual: 4.2ms\n✓ State hoisted to ViewModel\n✓ Room database score cache synchronized',
    code: `package com.kavindu.brainana.engine

import androidx.compose.runtime.Immutable
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update

@Immutable
data class PuzzleState(
    val currentScore: Int = 0,
    val activeChallenge: MathChallenge,
    val timeRemainingSec: Int = 30,
    val streakCount: Int = 0,
    val isGameOver: Boolean = false
)

class BrainanaGameViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(PuzzleState(activeChallenge = generateChallenge(1)))
    val uiState: StateFlow<PuzzleState> = _uiState.asStateFlow()

    fun submitAnswer(userAnswer: Int) {
        val current = _uiState.value
        val isCorrect = current.activeChallenge.expectedAnswer == userAnswer

        _uiState.update { state ->
            if (isCorrect) {
                state.copy(
                    currentScore = state.currentScore + (100 * (state.streakCount + 1)),
                    streakCount = state.streakCount + 1,
                    activeChallenge = generateChallenge(level = (state.currentScore / 500) + 1)
                )
            } else {
                state.copy(streakCount = 0)
            }
        }
    }
}`
  }
];

const FAQS = [
  {
    q: "How do you architect backend systems to scale for 200,000+ active customers without downtime?",
    a: "I decouple user-facing HTTP endpoints from background processing using asynchronous queue pipelines (like Redis or database-backed job tables with row-level locks). This prevents external rate limits (such as WhatsApp/SMS gateway quotas) from stalling customer requests. Database schemas are indexed on query bottlenecks, transactions are isolated with strict ACID compliance, and repetitive static/session queries are cached."
  },
  {
    q: "What is your experience with Meta WhatsApp Business Cloud API & Telecom SMS gateways?",
    a: "I have built production-grade campaign management platforms integrating Meta Graph Cloud APIs, Hutch SMS APIs, and Dialog gateways. My implementations handle automated webhook receipt verification, template variable substitution, dynamic batching, bounce detection, and automatic carrier failover routing."
  },
  {
    q: "Do you build complete native Android mobile applications from scratch?",
    a: "Yes. I develop native Android apps using Kotlin, Java, and modern Jetpack Compose. I follow clean MVVM/MVI architectures, integrate Room Database for local offline persistence, handle Coroutines for smooth asynchronous tasks, and optimize frame budgets to ensure flawless 60FPS performance."
  },
  {
    q: "How do you approach database schema design and high-integrity workflows like Purchasing Orders?",
    a: "Enterprise operations like Purchasing Order Management and Loyalty Points require zero margin for data inconsistency. I design relational schemas (MySQL/PostgreSQL) with foreign key constraints, explicit transaction boundaries (`BEGIN TRANSACTION` / `COMMIT`), audit logs for every state transition, and strict Role-Based Access Control (RBAC)."
  },
  {
    q: "What is your availability for full-time engineering roles, contracts, or consultations?",
    a: "I am actively available for software engineering roles, backend architectural consulting, and full-stack/mobile development contracts. Feel free to contact me via email (kavindumalshan2003@gmail.com) or WhatsApp (+94 74 089 0730)."
  }
];

/* ------------------------------------------------------------------ */
/* Main Portfolio Component                                           */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'home' | 'projects-page'>('home');
  const [projectDisplayMode, setProjectDisplayMode] = useState<'list' | 'grid'>('list');
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCodeSnippet, setActiveCodeSnippet] = useState(0);
  const [isSimulatingCode, setIsSimulatingCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [currentTime, setCurrentTime] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Live traffic simulation state
  const [simulatedRequests, setSimulatedRequests] = useState(14820);
  const [isSimulatingTraffic, setIsSimulatingTraffic] = useState(false);
  const [pipelineStep, setPipelineStep] = useState<number | null>(null);

  // Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const headerRef = useRef<HTMLDivElement | null>(null);

  // Floating hover preview coordinates for list view
  const mouseX = useSpring(0, { stiffness: 220, damping: 25 });
  const mouseY = useSpring(0, { stiffness: 220, damping: 25 });

  // Update live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const colomboTime = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(colomboTime);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track cursor for floating preview
  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX + 24);
    mouseY.set(e.clientY - 120);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    sfx.playSuccess();
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sfx.enabled = next;
    if (next) {
      sfx.playBlip(580);
      showToast('Sound Effects Enabled 🔔');
    } else {
      showToast('Sound Muted 🔕');
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      showToast('Copied email (kavindumalshan2003@gmail.com) to clipboard!');
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedCode(true);
      showToast('Code snippet copied to clipboard!');
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const runTrafficSimulation = () => {
    if (isSimulatingTraffic) return;
    setIsSimulatingTraffic(true);
    sfx.playBlip(600);
    setPipelineStep(0);

    const steps = [1, 2, 3, 4];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setPipelineStep(step);
        sfx.playBlip(650 + step * 80);
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setSimulatedRequests(prev => prev + 1);
      setIsSimulatingTraffic(false);
      setPipelineStep(null);
      sfx.playSuccess();
    }, 1800);
  };

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    sfx.playBlip(480);
    if (viewMode !== 'home') {
      setViewMode('home');
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          const headerH = headerRef.current?.offsetHeight ?? 0;
          window.scrollTo({ top: Math.max(target.getBoundingClientRect().top + window.scrollY - headerH - 20, 0), behavior: 'smooth' });
        }
      }, 100);
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const headerH = headerRef.current?.offsetHeight ?? 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 20;
    window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setNavOpen(false);
  }, [viewMode, prefersReducedMotion]);

  const scrollToTop = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    sfx.playBlip(520);
    setViewMode('home');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setNavOpen(false);
  }, [prefersReducedMotion]);

  const openProject = (project: Project) => {
    sfx.playBlip(540);
    setSelectedProject(project);
    setSelectedImageIndex(0);
    setLightboxOpen(false);
  };

  const closeProject = () => {
    sfx.playBlip(440);
    setSelectedProject(null);
    setSelectedImageIndex(0);
    setLightboxOpen(false);
  };

  // Categories list
  const categories = ['All', 'Backend System', 'Enterprise Platform', 'Mobile App', 'AI & IoT', 'Full-Stack'];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter(p => {
      const matchCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:kavindumalshan2003@gmail.com?subject=Project Inquiry from ${encodeURIComponent(contactName)}&body=${encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`)}`;
    window.location.href = mailto;
    setFormSent(true);
    showToast('Redirecting to your mail client...');
    setTimeout(() => {
      setContactModalOpen(false);
      setFormSent(false);
    }, 2000);
  };

  const activeProjectImages = selectedProject
    ? [selectedProject.imageUrl, ...(selectedProject.images || [])].filter(Boolean)
    : [];
  const activeImage = activeProjectImages[selectedImageIndex] || selectedProject?.imageUrl || '';

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white overflow-x-hidden relative"
    >
      {/* FLOATING AMBIENT PASTEL ORBS */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-100/40 via-sky-100/30 to-transparent blur-[120px] animate-float-slow" />
        <div className="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-emerald-100/40 via-teal-50/30 to-transparent blur-[140px] animate-float-reverse" />
        <div className="absolute bottom-[10%] left-[20%] w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-100/30 via-slate-100/30 to-transparent blur-[130px] animate-float-slow" />
        <div className="absolute inset-0 subtle-grid opacity-60" />
      </div>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full bg-slate-900 text-white text-xs font-mono shadow-2xl backdrop-blur-md flex items-center gap-2.5 border border-slate-700"
          >
            <Sparkles size={14} className="text-amber-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MINIMALIST FLOATING NAVBAR ================= */}
      <div ref={headerRef} className="fixed top-0 inset-x-0 z-[70] px-4 sm:px-8 md:px-14 pt-4">
        <header className="max-w-7xl mx-auto flex items-center justify-between py-3.5 px-6 sm:px-8 bg-white/90 backdrop-blur-md border border-slate-200/80 rounded-full shadow-xs">
          <a
            href="#top"
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-slate-900 hover:opacity-80 transition-opacity"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <div className="flex flex-col">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase">Kavindu Bogahawatte</span>
              <span className="font-mono text-[9px] text-slate-500 hidden sm:inline">Backend Architect • Mobile Specialist</span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-slate-500">
            {[
              { id: 'works', label: 'Works' },
              { id: 'pipeline', label: 'Pipeline' },
              { id: 'snippets', label: 'Code' },
              { id: 'stack', label: 'Stack' },
              { id: 'experience', label: 'Experience' },
              { id: 'about', label: 'About' },
              { id: 'faq', label: 'FAQ' },
            ].map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="hover:text-slate-900 transition-colors py-1 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <button
              onClick={() => setViewMode(viewMode === 'projects-page' ? 'home' : 'projects-page')}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-wider transition-all border ${viewMode === 'projects-page' ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-slate-400'}`}
            >
              All 30+ Archive ↗
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setContactModalOpen(true)}
              className="px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-medium uppercase tracking-wider transition-all shadow-xs active:scale-95"
            >
              Contact
            </button>

            <button
              onClick={() => setNavOpen(!navOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-slate-900 rounded-full bg-slate-100 border border-slate-200"
              aria-label="Toggle menu"
            >
              {navOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {navOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden mt-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col gap-4 text-center"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 font-mono text-[11px] text-slate-500">
                <span>Colombo, LK ({currentTime || 'UTC+5:30'})</span>
                <span className="text-emerald-600 font-semibold">● Available for Hire</span>
              </div>
              {[
                { id: 'works', label: 'Selected Works' },
                { id: 'pipeline', label: 'Architecture Pipeline' },
                { id: 'snippets', label: 'Code Snippets & Blueprints' },
                { id: 'stack', label: 'Tech Stack & Competencies' },
                { id: 'experience', label: 'Career Journey' },
                { id: 'about', label: 'About & Education' },
                { id: 'faq', label: 'Frequently Asked Questions' },
              ].map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => { handleNavClick(e, item.id); setNavOpen(false); }}
                  className="font-mono text-xs uppercase tracking-widest text-slate-700 hover:text-slate-900 py-2"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => { setViewMode(viewMode === 'projects-page' ? 'home' : 'projects-page'); setNavOpen(false); }}
                className="py-3 mt-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-mono text-xs uppercase font-bold tracking-widest"
              >
                Browse All 30+ Projects Archive ↗
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {viewMode === 'projects-page' ? (
        /* ================= DEDICATED ARCHIVE CATALOG ================= */
        <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 pt-36 pb-32 relative z-10">
          <div className="mb-12 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <button
                onClick={() => setViewMode('home')}
                className="font-mono text-xs text-slate-500 hover:text-slate-900 uppercase tracking-widest mb-4 inline-flex items-center gap-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home Overview
              </button>
              <h1 className="font-serif text-4xl sm:text-6xl text-slate-900 tracking-tight">
                Complete System &amp; Project Archive
              </h1>
              <p className="text-slate-600 font-light mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
                A comprehensive engineering record of 30+ enterprise platforms, backend engines, microservices, mobile apps, and machine learning pipelines built to date.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search systems, tags, client..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 transition-colors shadow-2xs"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { sfx.playBlip(520); setActiveCategory(cat); }}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${activeCategory === cat ? 'bg-slate-900 text-white font-bold shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-400'}`}
              >
                {cat} {cat === 'All' ? `(${ALL_PROJECTS.length})` : ''}
              </button>
            ))}
          </div>

          {/* Projects Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                onClick={() => openProject(proj)}
                className="group cursor-pointer bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <ImageWithFallback
                      src={proj.imageUrl}
                      alt={proj.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 font-mono text-[9px] text-slate-900 uppercase tracking-wider shadow-2xs">
                        {proj.category}
                      </span>
                    </div>
                    <div className="absolute top-3.5 right-3.5 font-mono text-[10px] text-slate-600 px-2.5 py-0.5 rounded-full bg-white/95 border border-slate-200 shadow-2xs">
                      {proj.year}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-serif text-2xl text-slate-900 group-hover:text-slate-600 transition-colors">
                        {proj.name}
                      </h3>
                      <ArrowUpRight size={18} className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                    </div>
                    <p className="text-slate-600 font-light text-xs leading-relaxed line-clamp-3 mb-4">
                      {proj.description}
                    </p>
                    {proj.metrics && (
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                        <Activity size={12} className="text-slate-900 shrink-0" />
                        <span className="truncate">{proj.metrics}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {proj.tags.slice(0, 4).map((t, ti) => (
                    <span key={ti} className="font-mono text-[9px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                      {t}
                    </span>
                  ))}
                  {proj.tags.length > 4 && (
                    <span className="font-mono text-[9px] text-slate-400 px-1.5 py-0.5">+{proj.tags.length - 4}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <Search size={32} className="text-slate-400 mx-auto mb-3" />
              <p className="font-mono text-sm text-slate-600">No matching projects found for &quot;{searchQuery}&quot;</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-4 px-4 py-2 rounded-full bg-slate-900 text-white font-mono text-xs uppercase font-bold"
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>
      ) : (
        /* ================= MAIN HOME PORTFOLIO ================= */
        <>
          {/* ================= HERO SHOWCASE ================= */}
          <section id="top" className="relative min-h-[94vh] flex flex-col justify-end px-4 sm:px-8 md:px-14 pb-16 pt-36 z-10 border-b border-slate-200/70 bg-white/70 backdrop-blur-xs">
            {/* Atmospheric subtle background image */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-8 mix-blend-multiply">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000"
                alt="Architectural Blueprint Background"
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
              
              {/* Live Badge & Colombo Status Ribbon */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] uppercase tracking-wider shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                  <span>Available for Backend Roles &amp; Contracts</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">
                  <Clock size={12} className="text-slate-900" />
                  <span>Colombo, Sri Lanka</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-900 font-semibold">{currentTime || 'UTC+5:30'}</span>
                </div>
              </div>

              {/* Bold Editorial Headline */}
              <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] tracking-tight text-slate-900 leading-[1.03] max-w-6xl mb-8">
                I engineer resilient <span className="italic font-light text-slate-500">backend systems</span>, distributed APIs &amp; native mobile apps.
              </h1>

              {/* Sub-Headline & Interactive Actions Grid */}
              <div className="grid lg:grid-cols-12 gap-8 items-end pt-8 border-t border-slate-100">
                <div className="lg:col-span-7 space-y-4">
                  <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                    Software Engineer &amp; System Architect with extensive production experience delivering enterprise procurement workflows, high-volume broadcast engines for <span className="text-slate-900 font-medium">200,000+ loyalty customers</span>, machine learning hydrological research, and native Android applications.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-xs">
                    <a
                      href="#works"
                      onClick={(e) => handleNavClick(e, 'works')}
                      className="px-6 py-3.5 rounded-full bg-slate-900 text-white font-medium uppercase tracking-wider hover:bg-slate-800 transition-all inline-flex items-center gap-2 shadow-xs active:scale-95"
                    >
                      Selected Works <ArrowRight size={14} />
                    </a>

                    <button
                      onClick={() => setViewMode('projects-page')}
                      className="px-6 py-3.5 rounded-full bg-white border border-slate-200 text-slate-800 hover:border-slate-900 transition-all uppercase tracking-wider inline-flex items-center gap-2 shadow-2xs active:scale-95"
                    >
                      30+ Projects Archive ↗
                    </button>

                    <button
                      onClick={() => copyToClipboard('kavindumalshan2003@gmail.com', 'email')}
                      className="px-4 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
                    >
                      {copiedEmail ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      <span>Copy Email</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Live Backend Telemetry & Traffic Simulator */}
                <div className="lg:col-span-5">
                  <div className="p-6 rounded-3xl bg-white/90 border border-slate-200/90 shadow-md backdrop-blur-md relative overflow-hidden">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 font-mono text-[10px] uppercase text-slate-500">
                      <div className="flex items-center gap-2">
                        <Terminal size={12} className="text-slate-900" />
                        <span>System Telemetry Matrix</span>
                      </div>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" /> LIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-mono text-xs mb-3">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] text-slate-500 block mb-1">PROD ACTIVE USERS</span>
                        <span className="text-slate-900 font-bold text-sm">200,000+</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] text-slate-500 block mb-1">PROD REQUESTS</span>
                        <span className="text-slate-900 font-bold text-sm">{simulatedRequests.toLocaleString()} req/s</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] text-slate-500 block mb-1">DB CONNECTION POOL</span>
                        <span className="text-emerald-700 font-bold text-sm">Optimal (16ms)</span>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-2xs">
                        <span className="text-[10px] text-slate-500 block mb-1">ASYNC QUEUE</span>
                        <span className="text-slate-900 font-bold text-sm">0 Pending</span>
                      </div>
                    </div>

                    {/* Interactive Traffic Simulator Trigger */}
                    <button
                      onClick={runTrafficSimulation}
                      disabled={isSimulatingTraffic}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-mono text-[11px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-2xs active:scale-95"
                    >
                      <Play size={12} className={isSimulatingTraffic ? 'animate-spin' : ''} />
                      <span>{isSimulatingTraffic ? 'Simulating Live Pipeline Request...' : 'Simulate Live API Request'}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ================= INFINITE DUAL MARQUEE TICKER ================= */}
          <section className="py-7 border-b border-slate-200/80 bg-white overflow-hidden select-none relative z-10">
            {/* Top Marquee */}
            <div className="animate-marquee-left mb-2.5">
              {[
                '✦ HIGH-THROUGHPUT BACKEND APIS',
                '✦ DISTRIBUTED SYSTEMS ARCHITECTURE',
                '✦ 200,000+ LOYALTY USERS SERVED',
                '✦ KOTLIN & JETPACK COMPOSE',
                '✦ WHATSAPP GRAPH CLOUD API',
                '✦ ACID TRANSACTIONAL SCHEMAS',
                '✦ PYTHON XGBOOST ML PIPELINES',
                '✦ ASYNCHRONOUS QUEUE WORKERS',
                '✦ HIGH-THROUGHPUT BACKEND APIS',
                '✦ DISTRIBUTED SYSTEMS ARCHITECTURE',
                '✦ 200,000+ LOYALTY USERS SERVED',
                '✦ KOTLIN & JETPACK COMPOSE',
              ].map((text, i) => (
                <span key={i} className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-500 mx-8 uppercase whitespace-nowrap">
                  {text}
                </span>
              ))}
            </div>

            {/* Bottom Inverted Marquee */}
            <div className="animate-marquee-right">
              {[
                '✦ PHP REST & NODE.JS MICROSERVICES',
                '✦ SLIIT & UNIVERSITY OF BEDFORDSHIRE',
                '✦ RELATIONAL DATABASE OPTIMIZATION',
                '✦ MULTI-CARRIER SMS DISPATCHING',
                '✦ ZERO STOCK DISCREPANCY PIPELINES',
                '✦ IOT ULTRASONIC TELEMETRY',
                '✦ CLEAN MVVM & MVI CODEBASE',
                '✦ PHP REST & NODE.JS MICROSERVICES',
                '✦ SLIIT & UNIVERSITY OF BEDFORDSHIRE',
                '✦ RELATIONAL DATABASE OPTIMIZATION',
              ].map((text, i) => (
                <span key={i} className="font-mono text-[11px] sm:text-xs tracking-[0.2em] text-slate-400 mx-8 uppercase whitespace-nowrap">
                  {text}
                </span>
              ))}
            </div>
          </section>

          {/* ================= MAIN CONTENT SECTIONS ================= */}
          <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-14 py-28 relative z-10">

            {/* ================= SELECTED WORKS (SIGNATURE HOVER LIST & GRID TOGGLE) ================= */}
            <section id="works" className="mb-36 scroll-mt-28">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6 border-b border-slate-200 pb-8">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                    <Sparkles size={14} className="text-slate-900" />
                    <span>Featured Engineering Portfolio</span>
                  </div>
                  <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-slate-900 tracking-tight">
                    Selected Works &amp; Enterprise Systems
                  </h2>
                </div>

                {/* View Switcher & Archive Button */}
                <div className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex items-center">
                    <button
                      onClick={() => { sfx.playBlip(500); setProjectDisplayMode('list'); }}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${projectDisplayMode === 'list' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      Hover List
                    </button>
                    <button
                      onClick={() => { sfx.playBlip(550); setProjectDisplayMode('grid'); }}
                      className={`px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all ${projectDisplayMode === 'grid' ? 'bg-white text-slate-900 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      Bento Grid
                    </button>
                  </div>

                  <button
                    onClick={() => setViewMode('projects-page')}
                    className="font-mono text-xs text-slate-700 hover:text-slate-900 uppercase tracking-widest underline underline-offset-4 hidden sm:inline-block ml-3"
                  >
                    View 30+ Archive ↗
                  </button>
                </div>
              </div>

              {/* CURSOR-FOLLOWING FLOATING PREVIEW CARD (FOR LIST VIEW) */}
              {!prefersReducedMotion && hoveredProject && projectDisplayMode === 'list' && (
                <motion.div
                  style={{
                    position: 'fixed',
                    left: mouseX,
                    top: mouseY,
                    pointerEvents: 'none',
                    zIndex: 90,
                  }}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.15 }}
                  className="hidden lg:block w-72 rounded-2xl overflow-hidden bg-white/95 border border-slate-200 shadow-2xl p-2 backdrop-blur-md"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-2 relative">
                    <ImageWithFallback
                      src={hoveredProject.imageUrl}
                      alt={hoveredProject.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-2 left-2 font-mono text-[8px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/90 text-slate-900 border border-slate-200">
                      {hoveredProject.category}
                    </span>
                  </div>
                  <div className="px-1 py-1">
                    <p className="font-serif text-sm text-slate-900 font-medium truncate">{hoveredProject.name}</p>
                    <p className="font-mono text-[10px] text-slate-500">{hoveredProject.client}</p>
                  </div>
                </motion.div>
              )}

              {/* VIEW MODE 1: INTERACTIVE HOVER LIST (SIGNATURE STYLE) */}
              {projectDisplayMode === 'list' ? (
                <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-3xl shadow-xs overflow-hidden">
                  {ALL_PROJECTS.slice(0, 6).map((proj, idx) => (
                    <motion.div
                      key={proj.id}
                      onMouseEnter={() => { sfx.playBlip(420); setHoveredProject(proj); }}
                      onMouseLeave={() => setHoveredProject(null)}
                      onClick={() => openProject(proj)}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      className="group cursor-pointer py-7 sm:py-8 px-6 sm:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-all"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6 max-w-2xl">
                        <span className="font-mono text-xs text-slate-400 w-8">0{idx + 1}</span>
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-1.5">
                            <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 group-hover:text-slate-600 transition-colors">
                              {proj.name}
                            </h3>
                            <span className="px-2.5 py-0.5 rounded-full font-mono text-[9px] uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                              {proj.category}
                            </span>
                          </div>
                          <p className="text-slate-600 font-light text-xs sm:text-sm leading-relaxed line-clamp-2">
                            {proj.tagline || proj.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-xs text-slate-500 pl-12 md:pl-0">
                        <div className="text-left md:text-right hidden sm:block">
                          <span className="text-slate-800 block font-medium">{proj.client}</span>
                          <span className="text-slate-400 text-[10px]">{proj.year}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-2xs">
                          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                /* VIEW MODE 2: BENTO GRID VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ALL_PROJECTS.slice(0, 6).map((proj, idx) => (
                    <motion.div
                      key={proj.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      onClick={() => openProject(proj)}
                      className="group cursor-pointer bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                          <ImageWithFallback
                            src={proj.imageUrl}
                            alt={proj.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                          />
                          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest text-slate-900 border border-slate-200 shadow-2xs">
                            {proj.category}
                          </span>
                          <span className="absolute top-3 right-3 bg-white/95 font-mono text-[10px] text-slate-600 px-2.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                            {proj.year}
                          </span>
                        </div>
                        <div className="p-6">
                          <h3 className="font-serif text-2xl text-slate-900 group-hover:text-slate-600 transition-colors mb-2">
                            {proj.name}
                          </h3>
                          <p className="text-slate-600 font-light text-xs leading-relaxed line-clamp-3 mb-4">
                            {proj.description}
                          </p>
                          {proj.metrics && (
                            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                              <Activity size={12} className="text-slate-900 shrink-0" />
                              <span className="truncate">{proj.metrics}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {proj.tags.slice(0, 3).map((t, ti) => (
                          <span key={ti} className="font-mono text-[9px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Archive Callout Banner */}
              <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <h4 className="font-serif text-2xl text-slate-900">Looking for complete project history?</h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 font-light">
                    Access all 30+ enterprise systems, backend modules, mobile releases, and research tools in the complete archive.
                  </p>
                </div>
                <button
                  onClick={() => setViewMode('projects-page')}
                  className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs uppercase font-medium tracking-wider transition-all whitespace-nowrap shadow-xs"
                >
                  Explore All 30+ Projects ↗
                </button>
              </div>
            </section>

            {/* ================= INTERACTIVE ARCHITECTURE PIPELINE VISUALIZER ================= */}
            <section id="pipeline" className="mb-36 scroll-mt-28">
              <div className="mb-14 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                    <Radio size={14} className="text-emerald-600 animate-pulse" />
                    <span>System Architecture Blueprint</span>
                  </div>
                  <h2 className="font-serif text-4xl sm:text-5xl text-slate-900 tracking-tight">
                    High-Throughput Request Pipeline
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-xs sm:text-sm max-w-md">
                  Visual node topology representing how campaign messages and enterprise purchase workflows execute in production.
                </p>
              </div>

              {/* Interactive Pipeline Node Graph */}
              <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {[
                    {
                      step: 1,
                      title: '1. Client Layer',
                      subtitle: 'Web / Android Apps',
                      desc: 'Encrypted HTTPS / REST & WebSocket traffic with JWT auth headers.',
                      metrics: '< 20ms Edge Latency',
                      badge: 'Origin'
                    },
                    {
                      step: 2,
                      title: '2. Gateway & Queue',
                      subtitle: 'Redis / Reverse Proxy',
                      desc: 'Rate-limiting, IP whitelisting, and asynchronous job queuing.',
                      metrics: '1,000+ jobs/sec buffer',
                      badge: 'Buffer'
                    },
                    {
                      step: 3,
                      title: '3. Worker Engines',
                      subtitle: 'PHP / Node.js Clusters',
                      desc: 'ACID transaction execution, inventory stock locks, and batch segmentation.',
                      metrics: 'Zero Stock Discrepancy',
                      badge: 'Core'
                    },
                    {
                      step: 4,
                      title: '4. Dispatch & Gateways',
                      subtitle: 'Meta WhatsApp & SMS',
                      desc: 'Direct Graph API calls, Hutch SMS gateway dispatching, and webhook receipt logger.',
                      metrics: '200,000+ Delivered',
                      badge: 'Output'
                    }
                  ].map((node, i) => {
                    const isActive = pipelineStep === node.step;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className={`p-6 rounded-2xl border transition-all ${isActive ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:border-slate-300'}`}
                      >
                        <div className="flex items-center justify-between font-mono text-[10px] uppercase mb-2">
                          <span className="font-semibold text-slate-500">{node.badge}</span>
                          <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">{node.metrics}</span>
                        </div>
                        <h3 className="font-serif text-lg font-medium text-slate-900 mb-0.5">{node.title}</h3>
                        <p className="font-mono text-xs text-slate-500 mb-3">{node.subtitle}</p>
                        <p className="text-slate-600 text-xs font-light leading-relaxed">{node.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-600" />
                    <span>Tested for 99.98% production uptime under 200,000+ customer broadcast surges.</span>
                  </div>
                  <button
                    onClick={runTrafficSimulation}
                    className="text-slate-900 underline underline-offset-4 hover:opacity-75 font-semibold"
                  >
                    Trigger Test Packet ⚡
                  </button>
                </div>
              </div>
            </section>

            {/* ================= CODE SNIPPETS & ARCHITECTURE PLAYGROUND ================= */}
            <section id="snippets" className="mb-36 scroll-mt-28">
              <div className="mb-14 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                    <Code2 size={14} className="text-slate-900" />
                    <span>Behind The Architecture</span>
                  </div>
                  <h2 className="font-serif text-4xl sm:text-5xl text-slate-900 tracking-tight">
                    Code Snippets &amp; Architectural Blueprints
                  </h2>
                </div>
                <p className="text-slate-600 font-light text-xs sm:text-sm max-w-md">
                  Inspect real backend logic, asynchronous worker loops, and machine learning inference pipelines.
                </p>
              </div>

              {/* Snippets Container */}
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Tabs */}
                <div className="lg:col-span-4 space-y-3">
                  {CODE_SNIPPETS.map((snip, idx) => (
                    <button
                      key={snip.id}
                      onClick={() => { sfx.playBlip(530); setActiveCodeSnippet(idx); setIsSimulatingCode(false); }}
                      className={`w-full text-left p-5 rounded-2xl transition-all border ${activeCodeSnippet === idx ? 'bg-white border-slate-900 shadow-sm' : 'bg-slate-50 border-slate-200/80 text-slate-600 hover:bg-white hover:border-slate-300'}`}
                    >
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase text-slate-400 mb-1">
                        <span>{snip.lang}</span>
                        <span className="text-slate-900 font-semibold">{snip.domain}</span>
                      </div>
                      <h4 className="font-mono text-sm font-semibold text-slate-900">{snip.title}</h4>
                      <p className="text-slate-600 text-xs font-light mt-1 line-clamp-2">{snip.desc}</p>
                    </button>
                  ))}
                </div>

                {/* Right Code Viewer */}
                <div className="lg:col-span-8 rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl text-slate-200">
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-xs text-slate-300 ml-2">
                        {CODE_SNIPPETS[activeCodeSnippet].title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsSimulatingCode(!isSimulatingCode);
                          sfx.playBlip(620);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] transition-all border ${isSimulatingCode ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'}`}
                      >
                        <Play size={11} />
                        <span>{isSimulatingCode ? 'Hide Output' : 'Test Output'}</span>
                      </button>

                      <button
                        onClick={() => copyToClipboard(CODE_SNIPPETS[activeCodeSnippet].code, 'code')}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white font-mono text-[11px] transition-all"
                      >
                        {copiedCode ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                        <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6 overflow-x-auto max-h-[460px] font-mono text-xs leading-relaxed text-slate-200">
                    <pre>
                      <code>{CODE_SNIPPETS[activeCodeSnippet].code}</code>
                    </pre>
                  </div>

                  {/* Simulated Terminal Execution Output Console */}
                  <AnimatePresence>
                    {isSimulatingCode && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-slate-800 bg-black/70 p-5 font-mono text-[11px] text-emerald-400"
                      >
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase mb-2">
                          <Terminal size={11} />
                          <span>Simulation Output Console</span>
                        </div>
                        <pre className="whitespace-pre-line leading-relaxed">
                          {CODE_SNIPPETS[activeCodeSnippet].simulatedOutput}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </section>

            {/* ================= TECHNICAL STACK & COMPETENCIES ================= */}
            <section id="stack" className="mb-36 scroll-mt-28">
              <div className="mb-14 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                  <Cpu size={14} className="text-slate-900" />
                  <span>Technical Competencies</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl text-slate-900 tracking-tight">
                  Systems Architecture &amp; Skill Matrix
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: <Server className="text-slate-900 mb-4" size={26} />,
                    title: 'Backend & APIs',
                    desc: 'High-concurrency microservices, secure webhooks, and asynchronous message processing.',
                    items: ['PHP 8.x REST APIs', 'Node.js & Express', 'Java / Spring Boot', 'Python Fast-Inference', 'Meta WhatsApp Cloud API', 'Hutch / Dialog SMS APIs']
                  },
                  {
                    icon: <Smartphone className="text-slate-900 mb-4" size={26} />,
                    title: 'Android Mobile',
                    desc: 'Native reactive architectures built with modern declarative toolkits and local storage.',
                    items: ['Android SDK (API 34+)', 'Kotlin & Java', 'Jetpack Compose', 'Room Database', 'Kotlin Coroutines', 'Firebase Cloud Services']
                  },
                  {
                    icon: <Database className="text-slate-900 mb-4" size={26} />,
                    title: 'Databases & Storage',
                    desc: 'Relational data modeling, schema indexing, caching layers, and transaction isolation.',
                    items: ['MySQL & Relational Schema', 'MongoDB NoSQL', 'Redis In-Memory Cache', 'MSSQL Integration', 'ACID Transaction Design', 'Database Query Tuning']
                  },
                  {
                    icon: <ShieldCheck className="text-slate-900 mb-4" size={26} />,
                    title: 'DevOps & Tooling',
                    desc: 'Deployment orchestration, reverse proxies, media transcoding pipelines, and testing.',
                    items: ['Linux Server Administration', 'cPanel & Hostinger', 'FFmpeg Transcoding', 'Postman API Testing', 'Git & CI/CD Workflows', 'REST / OAuth2 Security']
                  }
                ].map((col, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {col.icon}
                      <h3 className="font-serif text-xl text-slate-900 font-medium mb-2">{col.title}</h3>
                      <p className="text-slate-600 text-xs font-light leading-relaxed mb-6">{col.desc}</p>
                    </div>

                    <ul className="space-y-2 font-mono text-xs text-slate-600 border-t border-slate-100 pt-4">
                      {col.items.map((it, ii) => (
                        <li key={ii} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ================= PROFESSIONAL EXPERIENCE JOURNEY ================= */}
            <section id="experience" className="mb-36 scroll-mt-28">
              <div className="mb-14 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                  <Activity size={14} className="text-slate-900" />
                  <span>Production Impact</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl text-slate-900 tracking-tight">
                  Professional Experience
                </h2>
              </div>

              <div className="max-w-4xl space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/80 shadow-xs relative overflow-hidden"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <span className="font-mono text-xs text-slate-500 uppercase tracking-widest block mb-1">
                        ASB Fashion (Pvt) Ltd • IT Department
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-slate-900">
                        Software Engineer (Associate &amp; Intern)
                      </h3>
                    </div>
                    <span className="font-mono text-xs bg-slate-100 text-slate-800 px-4 py-1.5 rounded-full border border-slate-200 whitespace-nowrap">
                      Nov 2025 – Sept 2026
                    </span>
                  </div>

                  <div className="space-y-4 text-slate-600 font-light text-sm sm:text-base leading-relaxed">
                    <p>
                      Spearheaded internal system development, backend API design, database architecture, and campaign marketing engines across retail and enterprise departments.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <h4 className="font-mono text-xs font-semibold text-slate-900">Broadcast Management Platform</h4>
                        <p className="text-slate-600 text-xs font-light">
                          Designed the high-throughput SMS &amp; Meta WhatsApp campaign gateway serving over 200,000+ active loyalty customers.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <h4 className="font-mono text-xs font-semibold text-slate-900">Purchasing Order Management System</h4>
                        <p className="text-slate-600 text-xs font-light">
                          Engineered end-to-end procurement workflows, role-based approvals, and quality inspection pipelines.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <h4 className="font-mono text-xs font-semibold text-slate-900">Official Brand Web Platform</h4>
                        <p className="text-slate-600 text-xs font-light">
                          Developed the modern digital web storefront with online gift voucher purchasing and high SEO optimization.
                        </p>
                      </div>

                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <h4 className="font-mono text-xs font-semibold text-slate-900">Loyal Vault Point Engine</h4>
                        <p className="text-slate-600 text-xs font-light">
                          Integrated fast sub-40ms point calculations and promotion validations with physical checkout POS systems.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* ================= ABOUT & ACADEMIC FOUNDATION ================= */}
            <section id="about" className="mb-36 scroll-mt-28">
              <div className="grid lg:grid-cols-12 gap-12 items-center p-8 sm:p-12 md:p-16 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                    <Award size={14} className="text-slate-900" />
                    <span>Background &amp; Education</span>
                  </div>
                  <h2 className="font-serif text-3xl sm:text-5xl text-slate-900 mt-2 mb-6">
                    Disciplined foundation, continuous engineering growth.
                  </h2>
                  <p className="text-slate-600 font-light text-sm sm:text-base leading-relaxed mb-8">
                    Based in Colombo, Sri Lanka, my educational journey began at Mahanama College, Colombo 03, shaping my analytical discipline and physical science foundation before diving deep into software engineering and distributed systems.
                  </p>

                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h4 className="font-serif text-xl text-slate-900">BSc (Hons) Software Engineering</h4>
                        <p className="font-mono text-xs text-slate-500 uppercase">University of Bedfordshire, UK</p>
                      </div>
                      <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-max">
                        Completed (Awaiting Graduation)
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-3 border-t border-slate-100">
                      <div>
                        <h4 className="font-serif text-xl text-slate-900">Higher Diploma in IT (HDIT)</h4>
                        <p className="font-mono text-xs text-slate-500 uppercase">SLIIT City University, Colombo 03</p>
                      </div>
                      <span className="font-mono text-xs text-slate-500">2023 – 2026</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-3 border-t border-slate-100">
                      <div>
                        <h4 className="font-serif text-xl text-slate-900">Secondary Education (A/L &amp; O/L Physical Science)</h4>
                        <p className="font-mono text-xs text-slate-500 uppercase">Mahanama College, Colombo 03</p>
                      </div>
                      <span className="font-mono text-xs text-slate-500">Alumni</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 group shadow-inner">
                  <ImageWithFallback
                    src="/my-photo.jpg"
                    alt="Kavindu Bogahawatte"
                    className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-103 transition-all duration-700"
                    fallback="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 font-mono text-xs shadow-md">
                    <p className="text-slate-900 font-semibold">Kavindu Bogahawatte</p>
                    <p className="text-slate-500 text-[11px]">Software Engineer • Colombo, LK</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ================= INTERACTIVE FAQ ACCORDION ================= */}
            <section id="faq" className="mb-36 scroll-mt-28">
              <div className="mb-14 border-b border-slate-200 pb-8">
                <div className="flex items-center gap-2 font-mono text-xs text-slate-500 uppercase tracking-[0.3em] mb-2">
                  <MessageSquare size={14} className="text-slate-900" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h2 className="font-serif text-4xl sm:text-5xl text-slate-900 tracking-tight">
                  Architecture, Scaling &amp; Collaboration FAQs
                </h2>
              </div>

              <div className="space-y-4 max-w-4xl">
                {FAQS.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => { sfx.playBlip(510); setOpenFaqIndex(isOpen ? null : idx); }}
                        className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-xl sm:text-2xl text-slate-900 hover:text-slate-600 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={20}
                          className={`text-slate-900 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-slate-600 font-light text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ================= CONTACT & COLLABORATION ================= */}
            <section id="contact" className="scroll-mt-28">
              <div className="relative p-10 sm:p-16 md:p-20 rounded-3xl bg-slate-900 text-white text-center max-w-5xl mx-auto shadow-2xl overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-slate-200 font-mono text-[11px] uppercase tracking-wider mb-4">
                    <Zap size={12} className="text-amber-400" />
                    <span>Direct Engineering Connection</span>
                  </div>

                  <h2 className="font-serif text-4xl sm:text-6xl text-white tracking-tight mb-4">
                    Let&apos;s architect robust infrastructure together.
                  </h2>

                  <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed mb-10">
                    Available for backend architectural consulting, full-time software engineering roles, mobile development, and specialized API integrations.
                  </p>

                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => { sfx.playBlip(560); setContactModalOpen(true); }}
                      className="px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-mono text-xs uppercase font-bold tracking-widest transition-all shadow-lg active:scale-95"
                    >
                      Send Direct Message
                    </button>

                    <a
                      href="https://wa.me/94740890730"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-2"
                    >
                      <WhatsAppIcon /> WhatsApp (+94 74 089 0730)
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </main>
        </>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white py-14 px-4 sm:px-8 md:px-14 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-xs text-slate-500">
          <div>
            <p className="text-slate-800 font-medium">© {new Date().getFullYear()} Kavindu Bogahawatte. Backend Systems Architect &amp; Mobile Engineer.</p>
            <p className="text-slate-400 text-[11px] mt-1">Crafted with Next.js Turbopack &amp; Tailwind CSS • Colombo, LK</p>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://linkedin.com/in/kavindu-bogahawatte-7b3810320"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <LinkedinIcon /> LinkedIn
            </a>
            <a
              href="https://github.com/kavizzz03"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon /> GitHub
            </a>
            <button
              onClick={() => copyToClipboard('kavindumalshan2003@gmail.com', 'email')}
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Mail size={16} /> Email
            </button>
          </div>
        </div>
      </footer>

      {/* ================= SIGNATURE FLOATING ACTION DOCK ================= */}
      <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end gap-3">
        {/* Floating Action Menu */}
        <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/95 border border-slate-200 shadow-xl backdrop-blur-md">
          <button
            onClick={toggleSound}
            aria-label="Toggle Sound Effects"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${soundEnabled ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-500 hover:text-slate-900'}`}
            title={soundEnabled ? 'Mute audio' : 'Enable sound FX'}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <a
            href="https://wa.me/94740890730"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Connect on WhatsApp"
            className="w-10 h-10 rounded-full bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white flex items-center justify-center transition-all"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon />
          </a>

          <button
            onClick={() => copyToClipboard('kavindumalshan2003@gmail.com', 'email')}
            aria-label="Copy Email"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all"
            title="Copy Email Address"
          >
            {copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Mail size={16} />}
          </button>

          <button
            onClick={() => { sfx.playBlip(540); setContactModalOpen(true); }}
            aria-label="Open Contact Form"
            className="px-4 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-medium uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all"
          >
            <Send size={13} />
            <span className="hidden sm:inline">Connect</span>
          </button>

          <button
            onClick={() => scrollToTop()}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 flex items-center justify-center transition-all"
            title="Scroll to Top"
          >
            ↑
          </button>
        </div>
      </div>

      {/* ================= PROJECT DEEP-DIVE MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
            >
              {/* Modal Header Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-slate-100 text-slate-800 border border-slate-200 rounded-full">
                    {selectedProject.category}
                  </span>
                  <span className="font-mono text-xs text-slate-400">• {selectedProject.year}</span>
                </div>
                <button
                  onClick={closeProject}
                  className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-10 space-y-8">
                <div>
                  <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight mb-2">
                    {selectedProject.name}
                  </h2>
                  <p className="text-slate-500 font-mono text-xs mb-3">{selectedProject.tagline}</p>
                  <p className="text-slate-600 font-light text-base sm:text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Main Media Preview with Zoom */}
                <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group shadow-inner">
                  <ImageWithFallback src={activeImage} alt={selectedProject.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => { sfx.playBlip(560); setLightboxOpen(true); }}
                    className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 hover:bg-slate-900 hover:text-white transition-all shadow-xs flex items-center gap-2 font-mono text-xs"
                  >
                    <Maximize2 size={13} /> Fullscreen
                  </button>
                </div>

                {/* Details Breakdown */}
                <div className="grid md:grid-cols-3 gap-8 pt-4 border-t border-slate-100">
                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-3">
                        Key Architectural Deliverables
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.architecturePoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-700 font-light leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedProject.codePreview && (
                      <div>
                        <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 mb-2">
                          Core Logic Snippet
                        </h3>
                        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto">
                          <pre><code>{selectedProject.codePreview}</code></pre>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Metadata */}
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                      <div>
                        <h4 className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">Client &amp; Context</h4>
                        <p className="font-serif text-base text-slate-900 mt-1">{selectedProject.client}</p>
                      </div>

                      {selectedProject.metrics && (
                        <div>
                          <h4 className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">Impact &amp; Metrics</h4>
                          <p className="font-mono text-xs text-emerald-700 font-medium mt-1">{selectedProject.metrics}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-mono text-[10px] uppercase text-slate-400 tracking-wider mb-2">Tech Stack</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.tags.map((t, i) => (
                            <span key={i} className="font-mono text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FULLSCREEN IMAGE LIGHTBOX ================= */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-white/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-900 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <ImageWithFallback
              src={activeImage}
              alt="Fullscreen preview"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-slate-200"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= INTERACTIVE CONTACT MODAL ================= */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setContactModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
                <div>
                  <h3 className="font-serif text-3xl text-slate-900">Send a Message</h3>
                  <p className="font-mono text-xs text-slate-500 mt-1">kavindumalshan2003@gmail.com</p>
                </div>
                <button
                  onClick={() => setContactModalOpen(false)}
                  className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              {formSent ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-2xl text-slate-900">Launching Mail Client</h4>
                  <p className="text-slate-500 text-xs font-mono">Your message draft is ready to send.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase text-slate-500 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Christoph Nagel"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase text-slate-500 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase text-slate-500 mb-1.5">Message / Project Scope</label>
                    <textarea
                      required
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Describe your backend, API, or mobile project requirements..."
                      className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-900 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    Send Inquiry →
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}

