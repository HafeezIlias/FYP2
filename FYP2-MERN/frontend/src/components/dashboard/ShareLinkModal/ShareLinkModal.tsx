import React, { useState, useEffect } from 'react';
import { Link, Copy, QrCode, Trash2, Eye, EyeOff, RefreshCw, Clock } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Modal } from '../../common/Modal';
import { Button } from '../../common/Button';
import { firebaseSharingService, ShareToken } from '../../../services/firebase';
import { Hiker } from '../../../types';
import './ShareLinkModal.css';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  hiker: Hiker;
}

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  isOpen,
  onClose,
  hiker
}) => {
  const [loading, setLoading] = useState(false);
  const [existingTokens, setExistingTokens] = useState<ShareToken[]>([]);
  const [newToken, setNewToken] = useState<ShareToken | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [expirationDays, setExpirationDays] = useState<number | undefined>(undefined);
  const [showQRCode, setShowQRCode] = useState(false);

  // Load existing tokens when modal opens
  useEffect(() => {
    if (isOpen && hiker) {
      loadExistingTokens();
    }
  }, [isOpen, hiker]);

  const loadExistingTokens = async () => {
    try {
      setLoading(true);
      const tokens = await firebaseSharingService.getHikerShareTokens(hiker.id);
      setExistingTokens(tokens);
    } catch (error) {
      console.error('Error loading share tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateLink = async () => {
    try {
      setLoading(true);
      const token = await firebaseSharingService.generateShareToken(
        hiker.id,
        hiker.name,
        expirationDays,
        'admin' // You can replace with actual admin user ID if available
      );
      setNewToken(token);
      await loadExistingTokens();
    } catch (error) {
      console.error('Error generating share link:', error);
      alert('Failed to generate share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getShareUrl = (token: string): string => {
    return `${window.location.origin}/track/${token}`;
  };

  const copyToClipboard = async (token: string) => {
    const url = getShareUrl(token);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  const revokeToken = async (tokenId: string) => {
    if (!window.confirm('Are you sure you want to revoke this share link? It will no longer be accessible.')) {
      return;
    }

    try {
      setLoading(true);
      await firebaseSharingService.revokeShareToken(hiker.id, tokenId);
      await loadExistingTokens();
      if (newToken?.id === tokenId) {
        setNewToken(null);
      }
    } catch (error) {
      console.error('Error revoking token:', error);
      alert('Failed to revoke share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const enableToken = async (tokenId: string) => {
    try {
      setLoading(true);
      await firebaseSharingService.enableShareToken(hiker.id, tokenId);
      await loadExistingTokens();
    } catch (error) {
      console.error('Error enabling token:', error);
      alert('Failed to enable share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteToken = async (tokenId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this share link? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await firebaseSharingService.deleteShareToken(hiker.id, tokenId);
      await loadExistingTokens();
      if (newToken?.id === tokenId) {
        setNewToken(null);
      }
    } catch (error) {
      console.error('Error deleting token:', error);
      alert('Failed to delete share link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp).toLocaleString();
  };

  const isExpired = (token: ShareToken): boolean => {
    return token.expiresAt ? Date.now() > token.expiresAt : false;
  };

  const activeTokens = existingTokens.filter(t => t.enabled && !isExpired(t));
  const inactiveTokens = existingTokens.filter(t => !t.enabled || isExpired(t));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Share Location: ${hiker.name}`}
      size="lg"
    >
      <div className="share-link-modal">
        {/* Generate New Link Section */}
        <div className="share-link-modal__section">
          <h3 className="share-link-modal__section-title">
            <Link size={20} />
            Generate New Share Link
          </h3>
          <p className="share-link-modal__description">
            Create a secure link that allows others to track this hiker's location in real-time.
          </p>

          <div className="share-link-modal__options">
            <label className="share-link-modal__option">
              <span>Expiration (optional):</span>
              <select
                value={expirationDays || ''}
                onChange={(e) => setExpirationDays(e.target.value ? parseInt(e.target.value) : undefined)}
                disabled={loading}
              >
                <option value="">Never expires</option>
                <option value="1">1 day</option>
                <option value="7">7 days</option>
                <option value="30">30 days</option>
                <option value="90">90 days</option>
              </select>
            </label>
          </div>

          <Button
            onClick={generateLink}
            disabled={loading}
            loading={loading}
            variant="primary"
          >
            <Link size={16} />
            Generate Share Link
          </Button>
        </div>

        {/* New Token Display */}
        {newToken && (
          <div className="share-link-modal__section share-link-modal__new-token">
            <h3 className="share-link-modal__section-title">
              🎉 Link Generated Successfully!
            </h3>
            <div className="share-link-modal__token-display">
              <div className="share-link-modal__url">
                <input
                  type="text"
                  value={getShareUrl(newToken.token)}
                  readOnly
                  className="share-link-modal__url-input"
                />
                <Button
                  onClick={() => copyToClipboard(newToken.token)}
                  variant="secondary"
                  size="sm"
                >
                  {copiedToken === newToken.token ? '✓ Copied!' : <Copy size={16} />}
                </Button>
              </div>

              <div className="share-link-modal__actions">
                <Button
                  onClick={() => setShowQRCode(!showQRCode)}
                  variant="secondary"
                  size="sm"
                >
                  <QrCode size={16} />
                  {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
                </Button>
              </div>

              {showQRCode && (
                <div className="share-link-modal__qrcode">
                  <QRCodeSVG
                    value={getShareUrl(newToken.token)}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                  <p className="share-link-modal__qrcode-hint">
                    Scan this QR code with a mobile device
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active Links Section */}
        {activeTokens.length > 0 && (
          <div className="share-link-modal__section">
            <h3 className="share-link-modal__section-title">
              <Eye size={20} />
              Active Share Links ({activeTokens.length})
            </h3>
            <div className="share-link-modal__tokens-list">
              {activeTokens.map((token) => (
                <div key={token.id} className="share-token-card share-token-card--active">
                  <div className="share-token-card__header">
                    <div className="share-token-card__info">
                      <span className="share-token-card__status share-token-card__status--active">
                        Active
                      </span>
                      <span className="share-token-card__date">
                        Created: {formatDate(token.createdAt)}
                      </span>
                    </div>
                    {token.expiresAt && (
                      <div className="share-token-card__expiry">
                        <Clock size={14} />
                        Expires: {formatDate(token.expiresAt)}
                      </div>
                    )}
                  </div>

                  <div className="share-token-card__url">
                    <code>{getShareUrl(token.token)}</code>
                  </div>

                  <div className="share-token-card__stats">
                    {token.accessCount !== undefined && (
                      <span>Accessed: {token.accessCount} times</span>
                    )}
                    {token.lastAccessed && (
                      <span>Last access: {formatDate(token.lastAccessed)}</span>
                    )}
                  </div>

                  <div className="share-token-card__actions">
                    <Button
                      onClick={() => copyToClipboard(token.token)}
                      variant="secondary"
                      size="sm"
                    >
                      {copiedToken === token.token ? '✓ Copied' : <Copy size={14} />}
                    </Button>
                    <Button
                      onClick={() => revokeToken(token.id)}
                      variant="warning"
                      size="sm"
                    >
                      <EyeOff size={14} />
                      Revoke
                    </Button>
                    <Button
                      onClick={() => deleteToken(token.id)}
                      variant="danger"
                      size="sm"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inactive/Revoked Links Section */}
        {inactiveTokens.length > 0 && (
          <div className="share-link-modal__section">
            <h3 className="share-link-modal__section-title">
              <EyeOff size={20} />
              Revoked/Expired Links ({inactiveTokens.length})
            </h3>
            <div className="share-link-modal__tokens-list">
              {inactiveTokens.map((token) => (
                <div key={token.id} className="share-token-card share-token-card--inactive">
                  <div className="share-token-card__header">
                    <div className="share-token-card__info">
                      <span className={`share-token-card__status ${isExpired(token) ? 'share-token-card__status--expired' : 'share-token-card__status--revoked'}`}>
                        {isExpired(token) ? 'Expired' : 'Revoked'}
                      </span>
                      <span className="share-token-card__date">
                        Created: {formatDate(token.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="share-token-card__actions">
                    {!isExpired(token) && (
                      <Button
                        onClick={() => enableToken(token.id)}
                        variant="success"
                        size="sm"
                      >
                        <RefreshCw size={14} />
                        Re-enable
                      </Button>
                    )}
                    <Button
                      onClick={() => deleteToken(token.id)}
                      variant="danger"
                      size="sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Tokens Message */}
        {existingTokens.length === 0 && !newToken && (
          <div className="share-link-modal__empty">
            <p>No share links have been created for this hiker yet.</p>
            <p>Generate a new link to get started!</p>
          </div>
        )}
      </div>
    </Modal>
  );
};
