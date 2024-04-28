;; An on-chain counter that stores a count for each individual
(define-data-var count int 0)
(define-data-var my-string (string-utf8 256) u"j")

;; Define a map data structure
(define-map counters principal uint)


;; Function to retrieve the count for a given individual
(define-read-only (get-count (who principal))
  (default-to u0 (map-get? counters who))
)

;; Function to increment the count for the caller
(define-public (count-up)
  (ok (map-set counters tx-sender (+ (get-count tx-sender) u1)))
)

(define-public (add-number (number int))
    (let
        (
            (current-count (var-get count))
        )

        (var-set count (+ 1 number))
        (ok (var-get count))
    )
)

;; (define-public (add-2 (who principal))
;;     (if (is-some (map-get? counters who))
;;         (unwrap-panic (map-get? counters who))
;;         (ok (map-set counters who (+ u2 (get-count who))) )
;;     )
;; )

(define-public (add-2 (who principal))
  (if (is-some (map-get? counters who))
      (let ((current-count (unwrap-panic (map-get? counters who))))
        (ok (map-set counters who (+ current-count u2))))
      (ok (map-set counters who u2))))


(add-number 5)


(define-public (encrypt-string (new-string (string-utf8 256)))
  (begin 
    (var-set my-string new-string)
    (ok new-string)
    )
)

(define-read-only (get-encrypted)
  (var-get my-string)
)