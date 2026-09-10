/* QA.Hub AI Audits — integration helper
 * Connects the dashboard to the existing qahub-ai-api deployment.
 * The backend owns API secrets; this file only provides frontend helpers.
 */
const QA_AI_API_BASE = 'https://qahub-ai-api-glz7.vercel.app';

window.QA_AI = {
  apiBase: QA_AI_API_BASE,
  async acknowledgeAudit(processId, auditId) {
    const res = await fetch(`${QA_AI_API_BASE}/api/acknowledge-audit`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ processId, auditId })
    });
    if (!res.ok) throw new Error(`Acknowledgement failed (${res.status})`);
    return res.json();
  },
  statusLabel(status) {
    return ({
      transcribing: 'Transcribing',
      ai_scoring: 'AI Scoring',
      pending_review: 'Pending Review',
      completed: 'Completed',
      transcription_failed: 'Transcription Failed',
      ai_scoring_failed: 'AI Scoring Failed'
    })[status] || status || 'Unknown';
  }
};
